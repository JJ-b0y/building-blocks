import express from 'express';  // Import the Express framework to create the server and handle routing
import dotenv from 'dotenv';  // Import the dotenv package to manage environment variables
import cors from 'cors'; // Import the cors package to enable Cross-Origin Resource Sharing (CORS)
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './src/config/db.js';

dotenv.config();  // Load environment variables from .env file

const app = express();  // Create an instance of an Express application
const PORT = process.env.PORT || 5001; // Use the PORT from environment variables or default to 5001

app.use(cors(   // Enable CORS for all routes and origins
  {
    origin: 'http://localhost:5173' // Allow requests from this origin
    // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    // credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }
));

app.use(express.json());  // Middleware to parse JSON request bodies: req.body (needed for POST and PUT requests)

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);  // console.log the HTTP method, request URL, and request body
  next(); // Call next() to pass control to the next middleware function
});// Custom middleware to log incoming requests

app.use('/api/notes', notesRoutes);     // Use the notesRoutes.js file for any requests to /api/notes which we have imported above from routes folder (file path: backend/routes/notesRoutes.js)
// app.use('api/services', servicesRoutes);

connectDB().then(() => {  // Call the connectDB function to establish a connection to the database before starting the server
  app.listen(PORT, () => {  // Start the server and listen on the specified PORT
  console.log('Server started on PORT:', PORT);
  });
});

