import { IDietPlanType } from "./../utils/types";
import { Type } from "@google/genai";
import gemini from "../configs/gemini";

async function generateDietPlans(
  calories: number,
  age: number,
  height: number,
  weight: number,
  gender: "male" | "female",
  avoid?:string[],
  favorite?:string[],
): Promise<IDietPlanType[]> {
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate 3 distinct diet plans for:
  - Calories: ${calories} kcal,
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
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
            },
            description: {
              type: Type.STRING,
            },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            avoid: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            meals: {
              type: Type.OBJECT,
              properties: {
                breakfast: {
                  type: Type.OBJECT,
                  properties: {
                    name: {
                      type: Type.STRING,
                    },
                    description: {
                      type: Type.STRING,
                    },
                    price: {
                      type: Type.NUMBER,
                    },
                    protein: {
                      type: Type.NUMBER,
                    },
                    carbs: {
                      type: Type.NUMBER,
                    },
                    fats: {
                      type: Type.NUMBER,
                    },
                    calories: {
                      type: Type.NUMBER,
                    },
                    items: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: {
                            type: Type.STRING,
                          },
                          quantity: {
                            type: Type.NUMBER,
                          },
                          unit: {
                            type: Type.STRING,
                          },
                        },
                        propertyOrdering: ["name", "quantity", "unit"],
                      },
                    },
                  },
                  propertyOrdering: [
                    "name",
                    "description",
                    "price",
                    "protein",
                    "carbs",
                    "fats",
                    "calories",
                    "items",
                  ],
                },
                lunch: {
                  type: Type.OBJECT,
                  properties: {
                    name: {
                      type: Type.STRING,
                    },
                    description: {
                      type: Type.STRING,
                    },
                    price: {
                      type: Type.NUMBER,
                    },
                    protein: {
                      type: Type.NUMBER,
                    },
                    carbs: {
                      type: Type.NUMBER,
                    },
                    fats: {
                      type: Type.NUMBER,
                    },
                    calories: {
                      type: Type.NUMBER,
                    },
                    items: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: {
                            type: Type.STRING,
                          },
                          quantity: {
                            type: Type.NUMBER,
                          },
                          unit: {
                            type: Type.STRING,
                          },
                        },
                        propertyOrdering: ["name", "quantity", "unit"],
                      },
                    },
                  },
                  propertyOrdering: [
                    "name",
                    "description",
                    "price",
                    "protein",
                    "carbs",
                    "fats",
                    "calories",
                    "items",
                  ],
                },
                dinner: {
                  type: Type.OBJECT,
                  properties: {
                    name: {
                      type: Type.STRING,
                    },
                    description: {
                      type: Type.STRING,
                    },
                    price: {
                      type: Type.NUMBER,
                    },
                    protein: {
                      type: Type.NUMBER,
                    },
                    carbs: {
                      type: Type.NUMBER,
                    },
                    fats: {
                      type: Type.NUMBER,
                    },
                    calories: {
                      type: Type.NUMBER,
                    },
                    items: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: {
                            type: Type.STRING,
                          },
                          quantity: {
                            type: Type.NUMBER,
                          },
                          unit: {
                            type: Type.STRING,
                          },
                        },
                        propertyOrdering: ["name", "quantity", "unit"],
                      },
                    },
                  },
                  propertyOrdering: [
                    "name",
                    "description",
                    "price",
                    "protein",
                    "carbs",
                    "fats",
                    "calories",
                    "items",
                  ],
                },
                snacks: {
                  type: Type.OBJECT,
                  properties: {
                    name: {
                      type: Type.STRING,
                    },
                    description: {
                      type: Type.STRING,
                    },
                    price: {
                      type: Type.NUMBER,
                    },
                    protein: {
                      type: Type.NUMBER,
                    },
                    carbs: {
                      type: Type.NUMBER,
                    },
                    fats: {
                      type: Type.NUMBER,
                    },
                    calories: {
                      type: Type.NUMBER,
                    },
                    items: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: {
                            type: Type.STRING,
                          },
                          quantity: {
                            type: Type.NUMBER,
                          },
                          unit: {
                            type: Type.STRING,
                          },
                        },
                        propertyOrdering: ["name", "quantity", "unit"],
                      },
                    },
                  },
                  propertyOrdering: [
                    "name",
                    "description",
                    "price",
                    "protein",
                    "carbs",
                    "fats",
                    "calories",
                    "items",
                  ],
                },
              },
              propertyOrdering: ["breakfast", "lunch", "dinner", "snacks"],
            },
            total: {
              type: Type.OBJECT,
              properties: {
                calories: {
                  type: Type.NUMBER,
                },
                protein: {
                  type: Type.NUMBER,
                },
                carbs: {
                  type: Type.NUMBER,
                },
                fats: {
                  type: Type.NUMBER,
                },
              },
              propertyOrdering: ["calories", "protein", "carbs", "fats"],
            },
          },
          propertyOrdering: [
            "name",
            "description",
            "options",
            "avoid",
            "meals",
            "total",
          ],
        },
      },
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
    breakfast: dietPlan.meals.breakfast.items
      .map((item) => item.name + " " + item.quantity * 7 + " " + item.unit)
      .join(" || "),
    lunch: dietPlan.meals.lunch.items
      .map((item) => item.name + " " + item.quantity * 7 + " " + item.unit)
      .join(" || "),
    dinner: dietPlan.meals.dinner.items
      .map((item) => item.name + " " + item.quantity * 7 + " " + item.unit)
      .join(" || "),
    snacks: dietPlan.meals.snacks.items
      .map((item) => item.name + " " + item.quantity * 7 + " " + item.unit)
      .join(" || "),
  };
  return weeklyServings;
};
