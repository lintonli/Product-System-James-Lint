import { Request } from "express";
export interface ICategory {
    ID:string;
    NAME:string;
}
interface addCategory {
    NAME:string;
}
export interface CategoryRequest extends Request{
    body:addCategory
}