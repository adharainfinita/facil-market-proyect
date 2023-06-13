import { Router, Request, Response } from "express";
export const router = Router();
import { createUser } from '../controllers/createUser';
import { createCategory } from "../controllers/createCategory"
import { createReview } from "../controllers/createReview";

router.post('/users', createUser);
router.post("/category", createCategory);
router.post('/review', createReview);
router.get("/", (req: Request, res: Response) => {
  return res.send("Toy funcionando");
});