import request from 'supertest';
import express from 'express';
import router from '../../routes/recipe.routes';
import Recipe from '../../models/Recipe';

jest.mock('../../models/Recipe')

const app = express();
app.use(express.json());
app.use('/recipes', router);


describe('GET /recipes', () => {
  it('should return all recipes', async () => {
    // Given a mock implementation of Recipe.find
    const mockRecipes = {
      find: jest.fn().mockResolvedValue([{ name: 'Test Recipe' }])
    };
    Recipe.find = mockRecipes.find;

    // When a GET request is made to /recipes
    const response = await request(app).get('/recipes');

    // Then the response should be an array of recipes
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 500 if there is a server error', async () => {
    // Given a mock implementation of Recipe.find that throws an error
    const mockFind = jest.fn().mockRejectedValue(new Error('Server error'));
    Recipe.find = mockFind;

    // When a GET request is made to /recipes
    const response = await request(app).get('/recipes');

    // Then the response should be a server error
    expect(response.status).toBe(500);
  });
});

describe('GET /recipes/recipe/:id', () => {
  it('should return a recipe by ID', async () => {
    // Given a mock implementation of Recipe.findById
    const mockRecipe = { name: 'Test Recipe' };
    const mockFindById = jest.fn().mockResolvedValue(mockRecipe);
    Recipe.findById = mockFindById;

    // When a GET request is made to /recipes/recipe/1
    const response = await request(app).get('/recipes/recipe/1');

    // Then the response should be the recipe
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRecipe);
  });

  it('should return 404 if recipe is not found', async () => {
    // Given a mock implementation of Recipe.findById that returns null
    const mockFindById = jest.fn().mockResolvedValue(null);
    Recipe.findById = mockFindById;

    // When a GET request is made to /recipes/recipe/1
    const response = await request(app).get('/recipes/recipe/1');

    // Then the response should be a 404 error
    expect(response.status).toBe(404);
  });

  it('should return 500 if there is a server error', async () => {
    // Given a mock implementation of Recipe.findById that throws
    const mockFindById = jest.fn().mockRejectedValue(new Error('Server error'));
    Recipe.findById = mockFindById;

    // When a GET request is made to /recipes/recipe/1
    const response = await request(app).get('/recipes/recipe/1');

    // Then the response should be a server error
    expect(response.status).toBe(500);
  });
});

describe('POST /recipes/name', () => {
  it('should return recipes by name', async () => {
    // Given a mock implementation of Recipe.find
    const mockRecipes = {
      find: jest.fn().mockResolvedValue([{ name: 'Test Recipe' }])
    };
    Recipe.find = mockRecipes.find;

    // When a POST request is made to /recipes/name
    const response = await request(app)
      .post('/recipes/name')
      .send({ name: 'Test' });

    // Then the response should be an array of recipes
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return an empty array when no recipes are found', async () => {
    // Given a mock implementation of Recipe.find
    const mockRecipes = {
      find: jest.fn().mockResolvedValue([])
    };
    Recipe.find = mockRecipes.find;

    // When a POST request is made to /recipes/name
    const response = await request(app)
      .post('/recipes/name')
      .send({ name: 'Test' });

    // Then the response should be an array of recipes
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 500 if there is a server error', async () => {
    // Given a mock implementation of Recipe.find that throws an error
    const mockFind = jest.fn().mockRejectedValue(new Error('Server error'));
    Recipe.find = mockFind;

    // When a POST request is made to /recipes/name
    const response = await request(app)
      .post('/recipes/name')
      .send({ name: 'Test' });

    // Then the response should be a server error
    expect(response.status).toBe(500);
  });
});

describe('POST /recipes/categories', () => {
  it('should return recipes by category(s)', async () => {
    // Given a mock implementation of Recipe.find
    const mockRecipes = {
      find: jest.fn().mockResolvedValue([{ name: 'Test Recipe' }])
    };
    Recipe.find = mockRecipes.find;

    // When a POST request is made to /recipes/categories
    const response = await request(app)
      .post('/recipes/categories')
      .send({ categories: ['Test'] });

    // Then the response should be an array of recipes
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return an empty array when no recipes are found', async () => {
    // Given a mock implementation of Recipe.find
    const mockRecipes = {
      find: jest.fn().mockResolvedValue([])
    };
    Recipe.find = mockRecipes.find;

    // When a POST request is made to /recipes/categories
    const response = await request(app)
      .post('/recipes/categories')
      .send({ categories: ['Test'] });

    // Then the response should be an array of recipes
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 500 if there is a server error', async () => {
    // Given a mock implementation of Recipe.find that throws an error
    const mockFind = jest.fn().mockRejectedValue(new Error('Server error'));
    Recipe.find = mockFind;

    // When a POST request is made to /recipes/categories
    const response = await request(app)
      .post('/recipes/categories')
      .send({ categories: ['Test'] });

    // Then the response should be a server error
    expect(response.status).toBe(500);
  });
});

describe('POST /recipes/ingredients', () => {
  it('should return recipes by ingredient(s)', async () => {
    // Given a mock implementation of Recipe.find
    const mockRecipes = {
      find: jest.fn().mockResolvedValue([{ name: 'Test Recipe' }])
    };
    Recipe.find = mockRecipes.find;

    // When a POST request is made to /recipes/ingredients
    const response = await request(app)
      .post('/recipes/ingredients')
      .send({ ingredients: ['Test'] });

    // Then the response should be an array of recipes
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return an empty array when no recipes are found', async () => {
    // Given a mock implementation of Recipe.find
    const mockRecipes = {
      find: jest.fn().mockResolvedValue([])
    };
    Recipe.find = mockRecipes.find;

    // When a POST request is made to /recipes/ingredients
    const response = await request(app)
      .post('/recipes/ingredients')
      .send({ ingredients: ['Test'] });

    // Then the response should be an array of recipes
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 500 if there is a server error', async () => {
    // Given a mock implementation of Recipe.find that throws an error
    const mockFind = jest.fn().mockRejectedValue(new Error('Server error'));
    Recipe.find = mockFind;

    // When a POST request is made to /recipes/ingredients
    const response = await request(app)
      .post('/recipes/ingredients')
      .send({ ingredients: ['Test'] });

    // Then the response should be a server error
    expect(response.status).toBe(500);
  });
});
