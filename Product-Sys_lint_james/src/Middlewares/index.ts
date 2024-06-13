import path from "path";
import dotenv from "dotenv";
import  Jwt  from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import { Payload } from "../Models/User";


dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export interface ExtendedRequest extends Request{
    info? : Payload
}

export function verifyTokens(req:ExtendedRequest, res:Response, next:NextFunction){
    try {
        const token = req.headers['token'] as string
        if(!token){
            return res.status(401).json({
                message: "No token provided"
            })
        }

        const decodedData= Jwt.verify(token, process.env.SECRET_KEY as string) as Payload
        req.info = decodedData
    } catch (error) {
        return res.status(500).json(error);
    }

next()
}