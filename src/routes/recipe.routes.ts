import { Router, Request, Response } from 'express';
import RecipeModel from '../models/recipe.model';
import { QueryOptions } from "mongoose";

const router = Router();

// Get all recipes
router.get('/', async (req: Request, res: Response) => {
  try {
    const { cursor, limit = 1 } = req.query;
    let query: QueryOptions = {};

    if (cursor) {
      query = { _id: { $gt: cursor } };
    }

    const recipes = await RecipeModel.find(query)
      .limit(Number(limit))
      .sort({ _id: 1 });

    const prevCursor = cursor ? cursor : null;
    const nextCursor = recipes.length > 0 ? recipes[recipes.length - 1]._id : null;

    res.status(200).json({
      nextCursor,
      prevCursor,
      totalResults: recipes.length,
      recipes
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a recipe by ID
router.get('/recipe', async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id) {
    res.status(400).json("Recipe Id is required");
    return;
  }

  try {
    const recipe = await RecipeModel.findById(id);
    if (!recipe) {
      res.status(404).json('Recipe not found');
      return;
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST get recipes by name
router.post('/name', async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const recipes = await RecipeModel.find({ name: { $regex: new RegExp(name, 'i') } });
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST get recipes by category(s)
router.post('/categories', async (req: Request, res: Response) => {
  const { categories } = req.body;
  try {
    const recipes = await RecipeModel.find({ categories: { $in: categories } });
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST get recipes by ingredient(s)
router.post('/ingredients', async (req: Request, res: Response) => {
  const { ingredients } = req.body;
  try {
    const recipes = await RecipeModel.find({ ingredients: { $elemMatch: { ingredient: { $in: ingredients } } } });
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST create a new recipe
router.post('/', async (req: Request, res: Response) => {
  const newRecipe = new RecipeModel(req.body);
  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).send(savedRecipe);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// PUT update a recipe by ID
router.put('/recipe', async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(id, req.body, { new: true });
    console.log(updatedRecipe);
    if (!updatedRecipe) {
      res.status(404).send('Recipe not found');
    }
    res.status(200).send(updatedRecipe);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;