// server.ts
// Commenting out the setupTracing import and function call as the module is not found
import { initServerInstrumentation } from './otel';
initServerInstrumentation();

import express, { Request, Response } from 'express';

import cors from "cors";
import rateLimit from "express-rate-limit";
import emailRoutes from "./routes/emailRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.set("trust proxy", 1);

// Rate limiting
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  })
);
app.use("/api", emailRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
