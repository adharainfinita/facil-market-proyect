import { Request, Response } from "express";


export const receivedWebhook = async(req: Request, res: Response) =>{
    console.log(req.query);
    res.send('webhook')
}