import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private readonly jwtService:JwtService
    ){}

    async generateJwtToken(payload:any){
        const token=await this.jwtService.signAsync(payload);
        return token;
    }
}
