import express from 'express';

import * as dotenv from 'dotenv';
import router from './routes/blog.routes.js';
import userRouter from './routes/user.routes.js';
import '../src/cron/deleteOTP.js'


dotenv.config();

const app = express();

app.use(express.json())


app.use('/api/blogs',router );
app.use('/api/users', userRouter);



export default app;


