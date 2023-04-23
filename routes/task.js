import express from "express";
import {
  newBook,
 getAllBooks,
  deleteBook,
  updateUser,
  getBook
} from "../controllers/task.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newBook);

router.get("/showAll", isAuthenticated, getAllBooks);

router.get("/getbook", isAuthenticated, getBook);

router.route("/:id").delete(isAuthenticated, deleteBook).put(updateUser);

export default router;
