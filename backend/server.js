const express=require('express')
const dotenv=require('dotenv').config()
const colors=require('colors')
const morgan=require('morgan')
const bodyparser=require('body-parser')
const cors = require('cors');
const credentials = require('./middleware/credentials');
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB=require('./config/db')
const corsOptions = require('./config/corsOptions');
const port=process.env.PORT||8000
connectDB()
const app=express()


app.use(morgan("dev")) //showing routs on control commande

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());
// app.use(bodyparser.json()) //connect data from frontend to backend
app.use(cors(corsOptions));
// app.use(express.urlencoded({extended:false}))

app.use("/api/goals",require("./routes/goalsRoutes"))
app.use("/api/user",require("./routes/userRoutes"))
app.use(errorHandler)
app.listen(port,()=>console.log(`server started on port ${port}`))
 