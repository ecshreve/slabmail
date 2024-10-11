// server.ts
import cors from "cors";
import express from "express";
import emailRoutes from "./routes/emailRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use("/api", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
