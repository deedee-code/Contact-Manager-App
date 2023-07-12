const express = require('express');
const dotenv = require('dotenv').config();
const createRouter = require('./routes/contactRoute');
const userRouter = require('./routes/userRoute');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbconnection');


connectDB();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api', createRouter);
app.use('/api/user', userRouter);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
})
