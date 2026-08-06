import { CanActivate, ExecutionContext,UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

export class RoleGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request=context.switchToHttp().getRequest();
        const user=request.user;
        if(!user){
             throw new UnauthorizedException("1You do not have permission to access this resource");
        }
        if(user.role!=='ADMIN'){
            throw new UnauthorizedException("You do not have permission to access this resource");
        }
        return true;
}
}