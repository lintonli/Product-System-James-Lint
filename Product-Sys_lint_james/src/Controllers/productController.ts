import mssql from "mssql";
import { Request, Response, RequestHandler } from 'express';
import { v4 as uid } from "uuid";
import { IProduct, ProductRequest } from "../Models/product";
import { sqlConfig } from "../config";

export const addProduct = async (req: ProductRequest, res: Response) => {
    try {
        const id = uid();
        const { PNAME, PRICE, CATEGORYID } = req.body;
        // Make a connection to the server
        const pool = await mssql.connect(sqlConfig);
        await pool.request()
            .input("ID", id)
            .input("PNAME", PNAME)
            .input("PRICE", PRICE)
            .input("CATEGORYID", CATEGORYID)
            .execute('addProduct');

        return res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getProducts: RequestHandler = async (req, res) => {
    try {
        // Make a connection to the server
        const pool = await mssql.connect(sqlConfig);
        const products = (await pool.request().execute('getProducts')).recordset as IProduct[];
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getProduct = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        const product = (await pool.request()
            .input("ID", req.params.id)
            .execute('getProduct')).recordset[0] as IProduct;

        if (product && product.ID) {
            return res.status(200).json(product);
        }

        return res.status(400).json({ message: "Product not found" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const getProductByCategory = async(req:Request<{id:string}>, res:Response)=>{
    try {
        //make a connection to the server
        const pool = await mssql.connect(sqlConfig);


        //make a request
        const products = (await pool.request()
           .input("CATEGORYID", req.params.id)
           .execute('getProductsByCategory')).recordset as IProduct[];
           return res.status(200).json(products);

    } catch(error){
        // console.log(error);
        return res.status(500).json(error);
    }
}

export const updateProduct = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        const product = (await pool.request()
            .input("ID", req.params.id)
            .execute('getProduct')).recordset[0] as IProduct;

        if (product && product.ID) {
            const { PNAME, PRICE, CATEGORYID } = req.body;
            await pool.request()
                .input("ID", req.params.id)
                .input("PNAME", PNAME)
                .input("PRICE", PRICE)
                .input("CATEGORYID", CATEGORYID)
                .execute('updateProduct');

            return res.status(200).json({ message: "Product updated successfully" });
        }

        return res.status(400).json({ message: "Product not found" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong"+ error});
    }
};



export const deleteProduct = async (req: Request, res: Response) => {

    try {
        
        const pool = await mssql.connect(sqlConfig)

        const product = (await pool.request()
            .input("ID", req.params.id)
            .execute('getProduct')).recordset[0] as IProduct;
    
        if (product && product.ID) {
            await pool.request()
                .input("ID", req.params.id)
                .execute('deleteProduct');
            return res.status(200).json({ message: "Product deleted successfully" });
    
        }
        return res.status(400).json({ message: "Product not found" });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
        
    }
  
}
