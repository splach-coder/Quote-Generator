import Task from '../models/task.js';

function groupTasksByDate(tasks) {
    const groups = {};
    tasks.forEach(task => {
        const dateKey = task.dueDate
            ? new Date(task.dueDate).toISOString().split('T')[0]
            : 'No Date';
        if (!groups[dateKey]) groups[dateKey] = { tasks: [], completed: 0, total: 0 };
        groups[dateKey].tasks.push(task);
        groups[dateKey].total += 1;
        if (task.completed) groups[dateKey].completed += 1;
    });
    return groups;
}

class TaskController {
    async getTasks(req, res) {
        try {
            const search = req.query.search || '';
            const tasks = await Task.find({ title: { $regex: search, $options: 'i' } }).sort({ dueDate: 1 });
            const completedCount = await Task.countDocuments({ completed: true });
            const totalCount = await Task.countDocuments();
            const groupedTasks = groupTasksByDate(tasks);
            res.render('index', { groupedTasks, search, completedCount, totalCount });
        } catch (error) {
            console.log(error);
            res.status(500).send('Error retrieving tasks');
        }
    }

    async searchTasks(req, res) {
        try {
            const search = req.query.query || '';
            const tasks = await Task.find({ title: { $regex: search, $options: 'i' } });
            const completedCount = await Task.countDocuments({ completed: true });
            const totalCount = await Task.countDocuments();
            const groupedTasks = groupTasksByDate(tasks);
            res.render('index', { groupedTasks, search, completedCount, totalCount });
        } catch (error) {
            console.log(error);
            res.status(500).send('Error searching tasks');
        }
    }

    async createTask(req, res) {
        try {
            const { title, dueDate } = req.body;
            const task = new Task({ title, dueDate });
            await task.save();
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.status(500).send('Error creating task');
        }
    }

    async updateTask(req, res) {
        console.log('updateTask called for id:', req.params.id);
        try {
            const { id } = req.params;
            // Find the task first
            const task = await Task.findById(id);
            if (task) {
                task.completed = !task.completed; // Toggle the completed status
                await task.save();
            }
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.status(500).send('Error updating task');
        }
    }

    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            await Task.findByIdAndDelete(id);
            res.redirect('/');
        } catch (error) {
            res.status(500).send('Error deleting task');
        }
    }
}

export default TaskController;