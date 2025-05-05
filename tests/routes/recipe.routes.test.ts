import request from 'supertest';
import express from 'express';
import router from '../../src/routes/recipe.routes';
import RecipeModel from '../../src/models/recipe.model';
import {getMockedRecipe, getMockedRecipes} from "../testUtilities/recipes";

jest.mock('../../src/models/recipe.model', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      save: jest.fn()
    }))
  };
});

const app = express();
app.use(express.json());
app.use('/recipes', router);

describe('GET /recipes', () => {
  it('should return all recipes', async () => {
    // GIVEN a mock implementation of RecipeModel.find
    const mockedRecipes = getMockedRecipes();
    RecipeModel.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockedRecipes)
      })
    });

    // AND an expected response structure
    const expectedResponse = {
      recipes: mockedRecipes,
      nextCursor: "1",
      prevCursor: null,
      totalResults: mockedRecipes.length
    }

    // WHEN a GET request is made to /recipes
    const response = await request(app).get('/recipes');

    // THEN the response code should be 200
    expect(response.status).toBe(200);

    // AND the response body should be an object containing recipes, nextCursor, and prevCursor, totalEntries
    expect(response.body).toEqual(expectedResponse);
  });

  it('should return 500 if there is a server error', async () => {
    // Given a mock implementation of RecipeModel.find that throws an error
    RecipeModel.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        sort: jest.fn().mockRejectedValue(new Error('Server error'))
      })
    });

    // When a GET request is made to /recipes
    const response = await request(app).get('/recipes');

    // Then the response should be a server error
    expect(response.status).toBe(500);
  });
});

describe('GET /recipes/recipe/:id', () => {
  it('should return a recipe by Id', async () => {
    // GIVEN a mock implementation of RecipeModel.find
    const mockedRecipe = getMockedRecipe();
    RecipeModel.findById = jest.fn().mockReturnValue(mockedRecipe);

    // When a GET request is made to /recipes/recipe/1
    const response = await request(app).get('/recipes/recipe?id=1');

    // Then the response should be the recipe
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedRecipe);
  });

  it('should return 400 if id is not provided', async () => {
    // When a GET request is made to /recipes/recipe without an id
    const response = await request(app).get('/recipes/recipe');

    // Then the response should be a 400 error
    expect(response.status).toBe(400);
    expect(response.body).toEqual('Recipe Id is required');
  })

  it('should return 404 if recipe is not found', async () => {
    // Given a mock implementation of RecipeModel.findById that returns null
    RecipeModel.findById = jest.fn().mockResolvedValue(null);

    // When a GET request is made to /recipes/recipe/1
    const response = await request(app).get('/recipes/recipe?id=1');

    // Then the response should be a 404 error
    expect(response.status).toBe(404);
  });

  it('should return 500 if there is a server error', async () => {
    // Given a mock implementation of RecipeModel.findById that throws
    RecipeModel.findById = jest.fn().mockRejectedValue(new Error('Server error'));

    // When a GET request is made to /recipes/recipe/1
    const response = await request(app).get('/recipes/recipe?id=1');

    // Then the response should be a server error
    expect(response.status).toBe(500);
  });
});

describe('POST /recipes/name', () => {
  it('should return recipes by name', async () => {
    // Given a mock implementation of RecipeModel.find
    const mockRecipes = {
      find: jest.fn().mockResolvedValue([{ name: 'Test Recipe' }])
    };
    RecipeModel.find = mockRecipes.find;

    // When a POST request is made to /recipes/name
    const response = await request(app)
      .post('/recipes/name')
      .send({ name: 'Test' });

    // Then the response should be an array of recipes
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return an empty array when no recipes are found', async () => {
    // Given a mock implementation of RecipeModel.find
    const mockRecipes = {
      find: jest.fn().mockResolvedValue([])
    };
    RecipeModel.find = mockRecipes.find;

    // When a POST request is made to /recipes/name
    const response = await request(app)
      .post('/recipes/name')
      .send({ name: 'Test' });

    // Then the response should be an array of recipes
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 500 if there is a server error', async () => {
    // Given a mock implementation of RecipeModel.find that throws an error
    RecipeModel.find = jest.fn().mockRejectedValue(new Error('Server error'));

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
    // Given a mock implementation of RecipeModel.find
    const mockRecipes = {
      find: jest.fn().mockResolvedValue([{ name: 'Test Recipe' }])
    };
    RecipeModel.find = mockRecipes.find;

    // When a POST request is made to /recipes/categories
    const response = await request(app)
      .post('/recipes/categories')
      .send({ categories: ['Test'] });

    // Then the response should be an array of recipes
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return an empty array when no recipes are found', async () => {
    // Given a mock implementation of RecipeModel.find
    const mockRecipes = {
      find: jest.fn().mockResolvedValue([])
    };
    RecipeModel.find = mockRecipes.find;

    // When a POST request is made to /recipes/categories
    const response = await request(app)
      .post('/recipes/categories')
      .send({ categories: ['Test'] });

    // Then the response should be an array of recipes
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 500 if there is a server error', async () => {
    // Given a mock implementation of RecipeModel.find that throws an error
    RecipeModel.find = jest.fn().mockRejectedValue(new Error('Server error'));

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
    // Given a mock implementation of RecipeModel.find
    const mockRecipes = {
      find: jest.fn().mockResolvedValue([{ name: 'Test Recipe' }])
    };
    RecipeModel.find = mockRecipes.find;

    // When a POST request is made to /recipes/ingredients
    const response = await request(app)
      .post('/recipes/ingredients')
      .send({ ingredients: ['Test'] });

    // Then the response should be an array of recipes
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return an empty array when no recipes are found', async () => {
    // Given a mock implementation of RecipeModel.find
    const mockRecipes = {
      find: jest.fn().mockResolvedValue([])
    };
    RecipeModel.find = mockRecipes.find;

    // When a POST request is made to /recipes/ingredients
    const response = await request(app)
      .post('/recipes/ingredients')
      .send({ ingredients: ['Test'] });

    // Then the response should be an array of recipes
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 500 if there is a server error', async () => {
    // Given a mock implementation of RecipeModel.find that throws an error
    RecipeModel.find = jest.fn().mockRejectedValue(new Error('Server error'));

    // When a POST request is made to /recipes/ingredients
    const response = await request(app)
      .post('/recipes/ingredients')
      .send({ ingredients: ['Test'] });

    // Then the response should be a server error
    expect(response.status).toBe(500);
  });
});

describe('POST /recipe', () => {
  it('should create a new recipe', async () => {
    // Given a mock implementation of RecipeModel
    const recipe = { name: 'Test Recipe' };
    const mockSavedRecipe = { ...recipe, _id: '123' };

    // Mock the constructor and save method since RecipeModel is a class
    const mockSave = jest.fn().mockResolvedValue(mockSavedRecipe);
    const mockRecipeInstance = { save: mockSave };

    // @ts-expect-error - necessary to override constructor
    RecipeModel.mockImplementation(() => mockRecipeInstance);

    // When a POST request is made to /recipes (not /recipes/recipe)
    const response = await request(app)
      .post('/recipes')
      .send(recipe);

    // Then the response should be the saved recipe with status 201
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockSavedRecipe);
  });

  it('should return 400 if validation fails', async () => {
    // Given a mock implementation of RecipeModel with instance that throws error
    const validationError = new Error('Validation error');
    const mockSave = jest.fn().mockRejectedValue(validationError);
    const mockRecipeInstance = { save: mockSave };

    // @ts-expect-error - necessary to override constructor
    RecipeModel.mockImplementation(() => mockRecipeInstance);

    // When a POST request is made with invalid data to /recipes
    const response = await request(app)
      .post('/recipes')
      .send({ invalidField: 'data' });

    // Then the response should be a validation error
    expect(response.status).toBe(400);
  });

  it('should return 400 if required fields are missing', async () => {
    // Given a mock implementation of RecipeModel that throws missing field error
    const missingFieldError = new Error('Missing required fields');
    const mockSave = jest.fn().mockRejectedValue(missingFieldError);
    const mockRecipeInstance = { save: mockSave };

    // @ts-expect-error - necessary to override constructor
    RecipeModel.mockImplementation(() => mockRecipeInstance);

    // When a POST request is made with missing required fields
    const response = await request(app)
      .post('/recipes')
      .send({});

    // Then the response should be an error
    expect(response.status).toBe(400);
  });
});