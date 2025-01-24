/* TODO delete this or replace with password verification when accessing admin pages, fix structure to match others
'use server';
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST'){
        const { email, password } = req.body;
        if (email === "admin1@gmail.com" && password === "password"){
            res.status(200).json({message: "Login successful"});
        } else{
            res.status(401).json({message: "Login unsuccessful"});
        }
    }
} */