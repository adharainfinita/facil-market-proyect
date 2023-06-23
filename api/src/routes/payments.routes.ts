import postOrder from "../handlers/payments/postOrder";
import receivedWebhook from "../handlers/payments/webhook";

import { Router } from "express";
export const paymentRouter = Router();

paymentRouter.post("/payment", postOrder)
paymentRouter.post("/payment/webhook", receivedWebhook);
paymentRouter.get("/payment/success", (req, res)=>res.send('success'));
paymentRouter.get("/payment/failure", (req, res)=>res.send('failure'));
paymentRouter.get("/payment/pending", (req, res)=>res.send('pending'));

