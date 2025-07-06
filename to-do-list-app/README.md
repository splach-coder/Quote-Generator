# To-Do List Application

This is a simple To-Do List application built with Node.js, Express, and MongoDB. It allows users to manage their tasks with features such as CRUD operations, a search bar, and a progress tracker.

## Features

- **Create, Read, Update, Delete (CRUD)**: Manage your tasks easily.
- **Search Bar**: Quickly find tasks by title.
- **Progress Tracker**: Visualize the completion status of your tasks.
- **User-Friendly Interface**: Simple and intuitive design.

## Project Structure

```
to-do-list-app
├── src
│   ├── app.js
│   ├── controllers
│   │   └── taskController.js
│   ├── models
│   │   └── task.js
│   ├── routes
│   │   └── taskRoutes.js
│   ├── views
│   │   ├── index.ejs
│   │   ├── layout.ejs
│   │   └── partials
│   │       └── progress.ejs
│   └── public
│       ├── styles.css
│       └── scripts.js
├── .env
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd to-do-list-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```

2. Open your browser and go to `http://localhost:3000` to access the To-Do List application.

## Contributing

Feel free to submit issues or pull requests for any improvements or features you would like to see!

## License

This project is licensed under the MIT License.