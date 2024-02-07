const app = require('./app');
const ConnectDatabase = require('./config/database');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');



// Load environment variables
dotenv.config({  path: "../server/config/config.env" });


// Connect to the database
ConnectDatabase();


cloudinary.config({

  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  
});


// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down the server due to unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});