export interface RecipeComment {
  userId: string;
  comment: string;
  date: string;
}

export enum RecipeDifficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export enum MealType {
  BREAKFAST = 'Breakfast',
  LUNCH = 'Lunch',
  DINNER = 'Dinner',
  SNACK = 'Snack',
}

export enum RecipeStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface Recipe {
  id?: string;
  name: string;
  photoUrl: string;
  difficulty: RecipeDifficulty;
  calories: number;
  protein: number;
  ingredients: string[];
  preparationSteps: string[];
  mealType: MealType;
  preparationTime: number; // minutes
  servings: number;
  author: string;
  creationDate: string;
  tags: string[];
  favorites: string[]; // user email or IDs who favorited
  comments: RecipeComment[];
  vegetarian: boolean;
  status?: RecipeStatus;
}
