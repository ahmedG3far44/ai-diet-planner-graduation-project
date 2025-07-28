export interface IMealItem {
    name: string;
    quantity: number;
    unit: string;
};

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