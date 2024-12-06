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

// Get recipes by category
router.get('/category/:category', async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const recipes = await Recipe.find({ categories: category });
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
    res.status(500);
  }
});

export default router;