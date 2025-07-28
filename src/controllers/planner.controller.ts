import { INSPECT_MAX_BYTES } from "buffer";
import gemini from "../configs/gemini";
import { IDietPlanType, IUserInfo, responseSchema } from "./../utils/types";

async function generateDietPlans(
  userInfo: IUserInfo,
  avoid?: string[],
  favorite?: string[]
): Promise<IDietPlanType[]> {
  const user = calcUserCalories(userInfo);

  const { weight, height, age, gender, goal, active_rate } = userInfo;

  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate 3 distinct diet plans for:
  - Calories: ${user.calories} kcal,
  - Height: ${height} cm,
  - Weight: ${weight} kg,
  - Age: ${age} years,
  - Gender: ${gender},
  - Favorite foods: ${favorite?.join(", ")},
  - Foods to avoid: ${avoid?.join(", ")} .

  Requirements:
  1. Each plan must be significantly different from the others
  2. All serving sizes must be in grams (solids) except the eggs, vegetables and fruits which can be per piece or milliliters (liquids)
  3. Include:
     - Breakfast
     - Lunch
     - Dinner
     - Optional snacks
  4. For each meal, specify:
     - Exact food amounts (g/ml)
     - Macronutrients (protein, carbs, fat)
     - Total daily nutrition
  5. Incorporate favorite foods where appropriate
  6. Strictly exclude avoided foods`,
    config: {
      systemInstruction: `
      You are an expert nutritionist. Create customized diet plans that:
        - Are nutritionally balanced
        - Include the user's favorite foods when appropriate
        - Strictly avoid specified foods
        - Provide precise measurements in grams/ml
        - Offer distinct dietary approaches
        - Return perfect JSON without markdown
        `,
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });
  if (!response.text) {
    throw new Error("No response text received from Gemini API");
  }
  const data = response.text?.toString();

  const dietPlans: IDietPlanType[] = JSON.parse(data as string);

  return dietPlans;
}

export default generateDietPlans;

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
