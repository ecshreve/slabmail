// server.ts
import cors from "cors";
import express, { Request, Response } from "express";
import emailRoutes from "./routes/emailRoutes";
import rateLimit from "express-rate-limit";
const app = express();
const PORT = 3000;

// Middleware
//
// Rate limiting
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  })
);

app.use(cors());
app.use("/api", emailRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Metrics available at http://localhost:9464/metrics`);
});
