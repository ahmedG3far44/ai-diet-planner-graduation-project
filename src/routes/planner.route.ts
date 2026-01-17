import { Router } from "express";
import { calcUserCalories } from "../controllers/planner.controller";
import { IDietPlanType, responseSchema } from "../utils/types";


import gemini from "../configs/gemini";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const payload = req.body;
    const { goal, active_rate, height, weight, gender, age, avoid, favorite } = payload;


    const user = calcUserCalories({goal, active_rate, height, weight, gender, age});
   
   
     const response = await gemini.models.generateContentStream({
       model: "gemini-3-pro-preview",
         contents: `Generate 3 distinct diet plans for user with the following information:
       - Calories: ${user.calories} kcal,
       - Height: ${height} cm,
       - Weight: ${weight} kg,
       - Age: ${age} years,
       - Gender: ${gender},
       - Favorite foods: ${favorite?.join(", ")},
       - Foods to avoid: ${avoid?.join(", ")}`,
       config: {
         systemInstruction: `
         You are a professional nutritionist.
           Output rules:
           - Return valid JSON only
           - Follow the provided response schema exactly
           - Use simple, common foods
           - Keep calculations approximate but consistent
           - Do not explain decisions
           - Do not add commentary or markdown
           `,
         responseMimeType: "application/json",
         responseSchema: responseSchema,
       },
     });
   
       let fullText = "";
   
   for await (const chunk of response ) {
     const text = chunk.text;
     if (text) {
       fullText += text;

       console.log(text)

       res.write(text);
       
     }
   }
   if (!fullText) {
     throw new Error("Empty response from Gemini stream");
   }
   
   let dietPlans: IDietPlanType[];
   
   try {
     dietPlans = JSON.parse(fullText);
   } catch (err) {
     console.error("Invalid JSON from model:", fullText);
     throw new Error("Failed to parse diet plans JSON");
   }
   
   res.end();

  } catch (error) {
    console.error("Error generating diet plan:", (error as Error).message);
    res.status(500).json({ error: "Failed to generate diet plan" });
  }
});


export default router;