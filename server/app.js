import express from "express";
import cors from "cors";
const app = express();
import { compilerApi } from "compiler-api";
const port = 3001;

app.use(cors());
app.use(express.json());
app.post("/api/compiler", async (req, res) => {
  var data = {
    language: req.body.language,
    code: req.body.code,
    input: req.body.input,
  };

  const result = await compilerApi(data);
  console.log(result);
  console.log("hell");
  return res.json(result).status(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
