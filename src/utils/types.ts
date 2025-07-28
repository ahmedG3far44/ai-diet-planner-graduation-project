import { Type } from "@google/genai";

export interface IUserInfo {
  weight: number;      
  height: number;     
  age: number;        
  gender: 'male' | 'female';
  goal: -1 | 0 | 1;    
  active_rate: number
}

export interface IMealItem {
  name: string;
  quantity: number;
  unit: string;
}

export interface IMealType {
  name: string;
  description: string;
  price: number;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  items: IMealItem[];
}

export interface IDietPlanType {
  name: string;
  description: string;
  options: string[];
  avoid: string[];
  meals: {
    breakfast: IMealType;
    lunch: IMealType;
    dinner: IMealType;
    snacks: IMealType;
  };
  total: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

const mealItemSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    quantity: { type: Type.NUMBER },
    unit: { type: Type.STRING },
  },
  propertyOrdering: ["name", "quantity", "unit"],
};

const mealSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    description: { type: Type.STRING },
    price: { type: Type.NUMBER },
    protein: { type: Type.NUMBER },
    carbs: { type: Type.NUMBER },
    fats: { type: Type.NUMBER },
    calories: { type: Type.NUMBER },
    items: {
      type: Type.ARRAY,
      items: mealItemSchema,
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
};

const mealsSchema = {
  type: Type.OBJECT,
  properties: {
    breakfast: mealSchema,
    lunch: mealSchema,
    dinner: mealSchema,
    snacks: mealSchema,
  },
  propertyOrdering: ["breakfast", "lunch", "dinner", "snacks"],
};

const totalSchema = {
  type: Type.OBJECT,
  properties: {
    calories: { type: Type.NUMBER },
    protein: { type: Type.NUMBER },
    carbs: { type: Type.NUMBER },
    fats: { type: Type.NUMBER },
  },
  propertyOrdering: ["calories", "protein", "carbs", "fats"],
};

const itemSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    description: { type: Type.STRING },
    options: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    avoid: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    meals: mealsSchema,
    total: totalSchema,
  },
  propertyOrdering: [
    "name",
    "description",
    "options",
    "avoid",
    "meals",
    "total",
  ],
};

export const responseSchema = {
  type: Type.ARRAY,
  items: itemSchema,
};
