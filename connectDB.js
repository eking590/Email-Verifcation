const mongoose = require('mongoose'); 

mongoose.connect(process.env.DATABASE,{
            useNewUrlParser:true,
            // useCreateIndex:true,
            // useFindAndModify:true, 
            useUnifiedTopology:true 
        }).then(() => console.log('DB connected...')).catch(err => console.log('DB not connected...', err)); 
