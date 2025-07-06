import express from 'express';
import TaskController from '../controllers/taskController.js';
import methodOverride from 'method-override';

const router = express.Router();
const taskController = new TaskController();

// Override with POST having ?_method=DELETE
router.use(methodOverride('_method'));

// Define routes for task-related operations
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.get('/tasks/search', taskController.searchTasks);
router.get('/', (req, res) => taskController.getTasks(req, res));



export default router;