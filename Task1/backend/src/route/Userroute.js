

import express from "express"
import { AddUser, AllUserData, UpdatePoint } from "../controller/UserController.js";

const userRouter=express.Router();
 

userRouter.post("/insert",AddUser)
userRouter.get("/view",AllUserData)
// UPDATING POINT API
userRouter.put("/point/:id",UpdatePoint)


export default userRouter;