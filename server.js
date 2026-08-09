require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
//const passport = require('./Controller/googleController');
const app = express();
const cors = require('cors');
const Router = require('./Route/generalRoute');
//const googleRoute = require('./Route/googleRouter'); 
//const paymentRoute = require('./Route/paymentRoute');
const ConnectDBs = require('./Database/database');

ConnectDBs();

app.use(cors({origin:true,
  credentials:true,
  methods:["GET","PUT","PATCH","POST","DELETE"],
  allowedHeaders:['content-type','Authorization']
}))

app.use(express.json());
app.use(cookieParser());
//app.use(passport.initialize()); 
//app.use('/webhooks', express.raw({ type: 'application/json' }), webhookRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'Interview Prep API is running' });
});

app.use('/api', Router);
//app.use('/app', googleRoute); 
//app.use('/pay', paymentRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});