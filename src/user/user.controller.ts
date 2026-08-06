import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { AuthGuard } from '../common/guard/auth.guard';
import { TransformInterceptor } from 'src/common/interceptor/transform.interceptor';
import { RoleGuard } from '../common/guard/role.guard';
import { LoginUserDto } from './dto/login-user.dto/login-user.dto';

@Controller('user')
@UseInterceptors(TransformInterceptor) 
export class UserController {
    constructor(private readonly usersService: UserService) { }
    
    @Post()
    async create(@Body() dto: CreateUserDto) {
        return await this.usersService.create(dto);
    }

    
    @Post('login')
    async login(@Body() dto: LoginUserDto) {
        return await this.usersService.login(dto);
    }

    @UseGuards(AuthGuard,RoleGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto,
    ){
        return this.usersService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}
