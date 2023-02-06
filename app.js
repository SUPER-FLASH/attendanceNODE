const express = require('express');
const logger = require('morgan');
const cors = require('cors');
var cookieParser = require("cookie-parser");

const adminRouter = require('./Routes/AdminRoute');
const profileRouter = require('./Routes/ProfileRoute');
const leaveRequestRouter = require('./Routes/LeaveRequest')


app = express();

// app.use(logger);
app.use(express.json());
app.use(cookieParser());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use('/',adminRouter);
app.use('/profile',profileRouter);
app.use('/leave-request',leaveRequestRouter);


module.exports = app;