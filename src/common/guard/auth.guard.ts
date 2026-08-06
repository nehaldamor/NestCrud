import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){}
     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request=context.switchToHttp().getRequest<Request>();
        const authheader=request.headers.authorization;
        if(!authheader){
            throw new UnauthorizedException("unauthorized")
        }
         const [type, token] = authheader.split(' ');
        if(type !== 'Bearer' || !token){
            throw new UnauthorizedException("invalid")
        }
        try{
            const payload= this.jwtService.verify(token);
            request['user']=payload;
            return true;
        }catch(err){
            throw new UnauthorizedException("invalid token or expired")
        }
        
    }
}