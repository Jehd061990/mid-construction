import express, { json } from "express";
import floorPlanRoutes from "./routes/floorPlan.routes.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api/", floorPlanRoutes);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
