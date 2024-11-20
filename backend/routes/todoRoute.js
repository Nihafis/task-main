import { Router } from "express";
import { getTask, addTask, deleteTask, editTask } from "../controller/todoController.js";
import verifiytoken from "../util/verifiytoken.js";

const todoRoutes = Router();

todoRoutes.get("/tasks", getTask);
todoRoutes.post("/addtasks", verifiytoken, addTask);
todoRoutes.put("/edittasks/:id", verifiytoken, editTask);
todoRoutes.delete("/deletetasks/:id", verifiytoken, deleteTask);
export default todoRoutes;
