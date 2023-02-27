require('dotenv').config();
const { PROD_CONNECTION_STRING, LOCAL_CONNECTION_STRING, MONGODB_ENV } = process.env;
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
let mongodburl = "";

const app = express();

app.use(cors());
//Allow get all data in post request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

//register error logic
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({
        message: error.message || 'An unknown error occurred!'
    })
})

//database env
if (MONGODB_ENV == "dev") {
    mongodburl = LOCAL_CONNECTION_STRING;
}
else if (MONGODB_ENV == "prod") {
    mongodburl = PROD_CONNECTION_STRING;
}

// connect database
mongoose.connect(mongodburl, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('db connection failed...', err);
    }
    else {
        console.log('db connection success...');
    }
});



//routes
const userRoutes = require('./v1/routes/user-routes');
const authRoutes = require('./v1/routes/auth-routes');
const convertRoutes = require('./v1/routes/convert-routes');

//register routes
app.use('/api/v1/', userRoutes);

//login routes
app.use('/api/v1/', authRoutes);

//convert routes
app.use('/api/v1/', convertRoutes);


const port = 9000;
app.listen(port, () => console.log(`Cryve Server is listening on port ${port}.`));
