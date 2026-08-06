import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class LoggerMiddleware implements NestMiddleware{
    use(req:Request,res:Response,next:NextFunction){
        console.log(`the method is ${req.method} and url is ${req.originalUrl}`);
        next();
    }
}
