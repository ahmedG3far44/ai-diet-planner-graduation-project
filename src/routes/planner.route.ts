import { Router } from "express";
import generateDietPlans, { calcServingPerWeek } from "../controllers/planner.controller";
import { IDietPlanType } from "../utils/types";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const payload = req.body;
    console.log("Payload Object: ", payload);
    const { calories, height, weight, gender, age, avoid, favorite } = payload;
    const dietPlan = await generateDietPlans(calories, age, height, weight, gender, avoid, favorite);

    if (!dietPlan) {
      return res.status(400).json({ error: "Failed to generate diet plan" });
    }
    // console.log("Diet Plan Object: ", dietPlan);
    const weeklyServings = calcServingPerWeek(dietPlan[0] as IDietPlanType);

    res.status(200).json({ data: dietPlan, weeklyServings });
  } catch (error) {
    console.error("Error generating diet plan:", (error as Error).message);
    res.status(500).json({ error: "Failed to generate diet plan" });
  }
});

export default router;