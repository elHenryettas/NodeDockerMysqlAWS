import express from "express";
/* import ip from "ip"; */
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.SERVERPORT || 3000;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.send({ massage: "up" });
});



app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`); /* ${ip.address() */
});
