const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Event handlers for MongoDB connection
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

// Gracefully close MongoDB connection when the Node.js process terminates
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection disconnected through app termination');
        process.exit(0);
    });
});

// Export the Mongoose object for use in other modules
module.exports = mongoose;


