import express from 'express';
import mongoose from 'mongoose';
import recipeRoutes from './routes/recipe.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/recipes', recipeRoutes);

mongoose.connect('mongodb+srv://apeterson247:dbUserPassword@cluster0.wlvjj.mongodb.net/last-drop?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});