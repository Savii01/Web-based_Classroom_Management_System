const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectdb = require('./ConfigDB/config');

connectdb.authenticate().then(()=>{
    console.log('Database connected successfully');
}).catch(err =>{
    console.log('Error: ' + err);
})

const app = express();

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors("*"));

app.get('/', (req, res)=>{
    res.send('Welcome To the online classroom');
});

// routes
require("./Routes/studentRoute")(app)
require("./Routes/lecturerRoute")(app)



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app is listening on port:  ${port}....`)
  )