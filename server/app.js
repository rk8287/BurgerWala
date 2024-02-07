const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const errMiddleware = require('./middlewares/error');
const fileUpload = require('express-fileupload');



// Load environment variables
dotenv.config({ path: "./server/config/config.env"  });



app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(fileUpload());



//Routes 

const user = require('./routes/userRoutes');
const order = require('./routes/orderRoutes');
const product = require('./routes/productRoutes');
const payment = require('./routes/paymentRoutes');
const other = require('./routes/otherRoute');


app.use('/api/v1',user)
app.use('/api/v1',order)
app.use('/api/v1',product)
app.use('/api/v1', payment);
app.use('/api/v1', other);


// Middleware for handling errors
app.use(errMiddleware);

module.exports = app;