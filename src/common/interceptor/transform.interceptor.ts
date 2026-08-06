import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class TransformInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log(`before controller ${Date.now()}`)
        return next.handle().pipe(
            map((data)=>{
                console.log(`after controller ${Date.now()}`);
                return{
                    success:true,
                    message:"Request Successful",
                    data:data
                }
            })
        )
    }
}