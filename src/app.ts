import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import blogRoutes from './routes/blogRoutes';
import dotenv from 'dotenv';

dotenv.config();


const swaggerUi = require('swagger-ui-express');
const specs = require('../swaggerConfig');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://shyaka:shyaka123@cluster0.zykzoej.mongodb.net/';

mongoose.connect(MONGODB_URI, {
 
});

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/auth', authRoutes);
app.use('/api/', contactRoutes);
app.use('/api', blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;