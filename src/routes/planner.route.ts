import { Router } from "express";
import generateDietPlans, { calcServingPerMonth, calcServingPerWeek, calcUserCalories } from "../controllers/planner.controller";
import { IDietPlanType } from "../utils/types";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const payload = req.body;
    const { goal, active_rate, height, weight, gender, age, avoid, favorite } = payload;
    const dietPlan = await generateDietPlans({weight, height, age, gender, goal, active_rate}, avoid, favorite);
    if (!dietPlan) {
      return res.status(400).json({ error: "Failed to generate diet plan" });
    }
    const weeklyServings = calcServingPerWeek(dietPlan[0] as IDietPlanType);
    const monthlyServings = calcServingPerMonth(dietPlan[0] as IDietPlanType);

    res.status(200).json({ data: dietPlan, weeklyServings, monthlyServings });
  } catch (error) {
    console.error("Error generating diet plan:", (error as Error).message);
    res.status(500).json({ error: "Failed to generate diet plan" });
  }
});
router.post("/calc", async (req, res) => {
  try {
    const payload = req.body;
    const user =  calcUserCalories(payload);
    if (!user) {
      return res.status(400).json({ error: "Failed to generate diet plan" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error generating diet plan:", (error as Error).message);
    res.status(500).json({ error: "Failed to generate diet plan" });
  }
});

export default router;