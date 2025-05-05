import express from 'express';
import mongoose from 'mongoose';
import recipeRoutes from './routes/recipe.routes';
import dotenv from 'dotenv';

dotenv.config();

// App configuration
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wlvjj.mongodb.net/last-drop?retryWrites=true&w=majority&appName=Cluster0`;

// Middleware setup
app.use(express.json());
app.use('/recipes', recipeRoutes);

// Database connection
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    return true;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    return false;
  }
}

// Server startup
function startServer() {
  return app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Application initialization
async function bootstrap() {
  const isConnected = await connectToDatabase();

  if (!isConnected) {
    console.error('Server not started due to database connection failure');
    process.exit(1);
  }

  startServer();
}

// Start the application if not being imported as a module
if (require.main === module) {
  bootstrap().catch(err => {
    console.error('Failed to start application:', err);
    process.exit(1);
  });
}

export { app, connectToDatabase };