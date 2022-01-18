import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"
import path from "path";
import { routes } from "./routes";


const app = express();

app.use(express.json())
app.use(routes)

app.get("/", (req,res) =>{
  res.sendFile(path.join(__dirname, '/index.html'))
} )

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof Error){
    return response.status(400).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status:"error",
    message: "Internal server error"
  })
})


app.listen(3000, () => console.log("server is running"))