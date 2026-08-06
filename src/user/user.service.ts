import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { ConflictException } from "@nestjs/common";
import { LoginUserDto } from './dto/login-user.dto/login-user.dto';
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService,
        private readonly authService:AuthService
    ) { }
    async create(data: CreateUserDto) {
        const isUserExist = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (isUserExist) {
            throw new ConflictException('User with this email already exists');
        }
        const user=await this.prisma.user.create({
            data,
        });
        const payload={
            name:user.name,
            email:user.email,
            role:user.role
        }
        const token=await this.authService.generateJwtToken(payload);
        return {user,token}

    }

    async login(data:LoginUserDto){
        const user=await this.prisma.user.findUnique({
            where:{
                email:data.email
            }
        });
        if(!user){
            throw new ConflictException('User with this email does not exist');
        }
        if(user.password!==data.password){
            throw new ConflictException('Invalid password');
        }
        const payload={
            name:user.name,
            email:user.email,
            role:user.role
        }
        const token=await this.authService.generateJwtToken(payload);
        return {user,token}
    }
    async findAll() {
        return this.prisma.user.findMany();
    }

    async findOne(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
    async update(id: number, data: UpdateUserDto) {
        return this.prisma.user.update({
            where: {
                id,
            },
            data,
        });
    }
    async remove(id: number) {
        return this.prisma.user.delete({
            where: {
                id,
            },
        });
    }
}
