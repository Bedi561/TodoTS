import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const port = 3003;
const app = express();
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";


// Example CORS headers in Express
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  

app.use(cors());//this line tells Express to use the cors middleware for all incoming requests. 
app.use(express.json());//specifically parses JSON data from the request body for all incoming requests,
app.use("/auth", authRoutes);//. It means that the authRoutes will be used for any routes that start with /auth
app.use("/todo", todoRoutes);

app.listen(port, ()=> {
    console.log(`This todo app is listening at http://localhost:${port}`)
});


mongoose.connect('mongodb+srv://pranavbedi6:glk6qFhbFm03fRqc@cluster0.4xjhlm2.mongodb.net/', {});


