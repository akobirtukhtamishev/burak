import dotenv from 'dotenv';
dotenv.config();

console.log("PORT: " + process.env.PORT);
console.log("MONGO URL " + process.env.MONGO_URL);