import express from 'express';
    /* this is nodes built in module: helps me build safe file path EX: serve static files */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';
import mongoose from 'mongoose';
    /* imports my .env variables */
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* handles parsing incoming JSON request bodies */
app.use(express.json());

/* make the connection to mongoDB from mongoose */
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('🟢 connected to MongoDB'))
.catch((err) => console.error('🛑 MongoDB connection error:', err));

/* handle request to static files */
app.use(express.static(path.resolve(__dirname, '../client')));

/* handler to mount api routes */
app.use('/api', apiRouter);

/* catch for request made to unknown route */
app.use((req, res) => res.status(404).send('☹️ This page does not exist'));

/* express global error handler */
app.use(( err, req, res, next) => {
    console.error('❌ Express Error Handler:', err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
  });

/* start server */
app.listen(PORT, () => {
    console.log(`👂🏼 Server listening on port: ${PORT}.`);
});

export default app;