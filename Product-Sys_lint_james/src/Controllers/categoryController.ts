import { sqlConfig } from "../config";
import { Request, Response, RequestHandler } from "express";
import { v4 as uid } from "uuid";
import mssql, { pool } from "mssql";
import { CategoryRequest, ICategory } from "../Models/category";
import { log } from "console";


export const addCategory = async (req: CategoryRequest, res: Response) => {
    try {
        const id = uid();
        const { NAME } = req.body
        const pool = await mssql.connect(sqlConfig);
        await pool.request()
            .input("ID", id)
            .input("NAME", NAME)
            .execute('addCategory')
        return res.status(201).json({ message: "Category added successfully" })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Something went wrong" })
    }
}


export const getCategories: RequestHandler = async (req, res) => {
    try {
        //making a connection to the server
        const pool = await mssql.connect(sqlConfig)
        //making a request
        const categories = (await pool.request().execute('getCategories')).recordset as ICategory[]
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getCategory = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const category = (await pool.request()
            .input("ID", req.params.id)
            .execute('getCategory')).recordset[0] as ICategory

        if (category && category.ID) {
            return res.status(200).json(category)
        }
        return res.status(404).json({ message: "Category not found" })

    } catch (error) {
        return res.status(500).json(error)

    }

}

export const updateCategory = async (req: Request<{ id: string }>, res: Response) => {

    try {
        const pool = await mssql.connect(sqlConfig)

        const category = (await pool.request()
            .input("ID", req.params.id)
            .execute('getCategory')).recordset[0] as ICategory


        if (category && category.ID) {

            const { NAME } = req.body
            await pool.request()
                .input("ID", req.params.id)
                .input("NAME", NAME)
                .execute('updateCategory')

            return res.status(200).json({ message: "Category updated successfully" })
        }
        return res.status(404).json({ message: "Category not found" })


    } catch (error) {
        return res.status(500).json(error)

    }

}

export const deleteCategory = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const category = (await pool.request()
            .input("ID", req.params.id)
            .execute('getCategory')).recordset[0] as ICategory
        if (category && category.ID) {
            await pool.request()
                .input("ID", req.params.id)
                .execute('deleteCategory')
            return res.status(200).json({ message: "Category deleted succesfully" })
        }
        return res.status(404).json({ message: "Category not found" })

    } catch (error) {
        return res.status(500).json(error)
    }
}