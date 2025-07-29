

import express from "express"
import { HistoryData, HistoryStore } from "../controller/HistroyController.js";

const historyRouter=express.Router();
 

historyRouter.post("/history",HistoryStore)
historyRouter.get("/history/view",HistoryData)


export default historyRouter;