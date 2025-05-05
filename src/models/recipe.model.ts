import { ObjectId, Schema, model } from 'mongoose';

interface IRecipe {
  _id: ObjectId;
  title: string;
  description: string;
  ingredients: IIngredient[];
  instructions: IInstruction[];
  categories: string[];
  imageUris: string[];
}

interface IIngredient {
  ingredient: string;
  quantity: string;
  unit: string;
}

interface IInstruction {
  number: number;
  instruction: string;
}

const recipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [Object], required: true },
  instructions: { type: [Object], required: true },
  categories: { type: [String], required: true },
  imageUris: { type: [String], required: true }
});

const RecipeModel = model<IRecipe>('recipes', recipeSchema);

export default RecipeModel;