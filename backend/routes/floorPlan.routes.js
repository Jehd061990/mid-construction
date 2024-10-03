import express from "express";
import {
  getAllFloorPlan,
  getOneFloorPlan,
  createFloorPlan,
  updateFloorPlan,
  deleteFloorPlan,
} from "../controller/floorPlan.conrollers.js";

const route = express.Router();

route.get("/floorplan", getAllFloorPlan);
route.get("/floorplan/:id", getOneFloorPlan);
route.post("/floorplan", createFloorPlan);
route.put("/floorplan/:id", updateFloorPlan);
route.delete("/floorplan/:id", deleteFloorPlan);

export default route;
