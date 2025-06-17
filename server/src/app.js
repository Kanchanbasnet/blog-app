import express from 'express';

import * as dotenv from 'dotenv';
import router from './routes/blog.routes.js';

dotenv.config();

const app = express();

app.use(express.json())


app.use('/api/blogs',router );



export default app;


