import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import Task from './models/task.js';
import methodOverride from 'method-override';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // in case u want to define a post in .end nd use 3000 as defauly

// ES Module way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Initialize routes
app.use('/', taskRoutes);


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));