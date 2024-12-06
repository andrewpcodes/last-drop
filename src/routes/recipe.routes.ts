import { Router, Request, Response } from 'express';
import Recipe from '../models/Recipe';

const router = Router();

// Get all recipes
router.get('/', async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a recipe by ID
router.get('/recipe/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      res.status(404).send('Recipe not found');
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
    const recipes = await Recipe.find({ name: { $regex: new RegExp(name, 'i') } });
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST get recipes by category(s)
router.post('/categories', async (req: Request, res: Response) => {
  const { categories } = req.body;
  try {
    const recipes = await Recipe.find({ categories: { $in: categories } });
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST get recipes by ingredient(s)
router.post('/ingredients', async (req: Request, res: Response) => {
  const { ingredients } = req.body;
  try {
    const recipes = await Recipe.find({ ingredients: { $elemMatch: { ingredient: { $in: ingredients } } } });
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;