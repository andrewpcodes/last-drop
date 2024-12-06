import { ObjectId, Schema, model } from 'mongoose';

interface IRecipe {
  _id: ObjectId;
  name: string;
  ingredients: IIngredient[];
  instructions: IInstruction[];
  categories: string[];
}

interface IIngredient {
  ingreident: string;
  quantity: string;
  unit: string;
}

interface IInstruction {
  number: number;
  instruction: string;
}

const recipeSchema = new Schema<IRecipe>({
  _id: { type: Schema.ObjectId, required: true },
  name: { type: String, required: true },
  ingredients: { type: [Object], required: true },
  instructions: { type: [Object], required: true },
  categories: { type: [String], required: true },
});

const Recipe = model<IRecipe>('reciepes', recipeSchema);

export default Recipe;