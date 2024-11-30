// src/index.js
import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import winston from 'winston';

const app = express();
const PORT = 3000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Route setup
app.use("/api/events", eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
});

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
