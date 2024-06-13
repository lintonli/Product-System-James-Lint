import { Request } from "express";
export interface IProduct {
    ID:string;
    PNAME:string
    PRICE:string;
    CATEGORYID:string;
}

interface addProduct {
    PNAME:string
    PRICE:string;
    CATEGORYID:string;
}

export interface ProductRequest extends Request{
    body:addProduct;
}