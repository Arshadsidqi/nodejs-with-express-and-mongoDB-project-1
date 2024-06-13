const express =require("express");
const { PORT } = require("./config");
const {connectDB}=require("./config/database")
const morgan=require("morgan")
const userRouter=require("./router/userRouter")
const quoteRouter=require("./router/quoteRouter");
const { authenticate } = require("./middleware/authenticate");
const cookieParser=require("cookie-parser")

const app =express()
const startServer=()=>{
    connectDB()


    app.use(express.json())
    app.use(morgan("dev"))
    app.use(cookieParser())
    
    app.use("/user",userRouter)
    app.use("/quote",authenticate,quoteRouter)


app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`server running at http://localhost:${PORT}`);
  });
};
startServer();
