const express = require("express"); 
const cors = require('cors'); 
require('dotenv').config(); 
require('./db/connectDB'); 



const app = express(); 

//import the users route 
const authRoutes = require('./routes/auth'); 
const user = require("./models/user");

app.use(express.json()); 
app.use(cors()); 

//middlewares
app.use('/api', authRoutes); 

//import the db 
// const connection = require('./db/connectDB'); 

// (async () => await connection())(); 


 
app.use('/api/user', user); 








const port = process.env.PORT || 8080; 
app.listen(port, () => console.log(`server running on port ${port}...`)); 