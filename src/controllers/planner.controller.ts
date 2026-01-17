
import gemini from "../configs/gemini";
import { IDietPlanType, IUserInfo, responseSchema } from "./../utils/types";

// async function generateDietPlans(
//   userInfo: IUserInfo,
//   avoid?: string[],
//   favorite?: string[]
// ): Promise<IDietPlanType[]> {
 

// }

// export default generateDietPlans;

export const calcServingPerWeek = (dietPlan: IDietPlanType) => {
  const weeklyServings = {
    breakfast: dietPlan.meals.breakfast.items.map((item) => ({
      name: item.name,
      quantity: (item.quantity *= 7),
      unit: item.unit,
    })),
    lunch: dietPlan.meals.lunch.items.map((item) => ({
      name: item.name,
      quantity: (item.quantity *= 7),
      unit: item.unit,
    })),
    dinner: dietPlan.meals.dinner.items.map((item) => ({
      name: item.name,
      quantity: (item.quantity *= 7),
      unit: item.unit,
    })),
    snacks: dietPlan.meals.snacks.items.map((item) => ({
      name: item.name,
      quantity: (item.quantity *= 7),
      unit: item.unit,
    })),
  };
  return weeklyServings;
};


export const calcServingPerMonth = (dietPlan: IDietPlanType) => {
  const monthlyServings = {
    breakfast: dietPlan.meals.breakfast.items.map((item) => ({
      name: item.name,
      quantity: (item.quantity *= 30),
      unit: item.unit,
    })),
    lunch: dietPlan.meals.lunch.items.map((item) => ({
      name: item.name,
      quantity: (item.quantity *= 30),
      unit: item.unit,
    })),
    dinner: dietPlan.meals.dinner.items.map((item) => ({
      name: item.name,
      quantity: (item.quantity *= 30),
      unit: item.unit,
    })),
    snacks: dietPlan.meals.snacks.items.map((item) => ({
      name: item.name,
      quantity: (item.quantity *= 30),
      unit: item.unit,
    })),
  };
  return monthlyServings;
};


export const calcUserCalories = (params: IUserInfo) => {
  const { weight, height, age, gender, goal, active_rate } = params;

  const bmr =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const bmi = weight / (height / 100) ** 2;
  const bodyFat =
    gender === "male"
      ? 1.2 * bmi + 0.23 * age - 16.2
      : 1.2 * bmi + 0.23 * age - 5.4;

  const maintenanceCalories = bmr * active_rate;

  const goalCalories =
    goal === -1
      ? maintenanceCalories - 300
      : goal === 1
        ? maintenanceCalories + 300
        : maintenanceCalories;

  return {
    bmr: Math.round(bmr),
    body_fat: Math.round(bodyFat * 10) / 10,
    maintenance_calories: Math.round(maintenanceCalories),
    calories: Math.round(goalCalories),
  };
};
