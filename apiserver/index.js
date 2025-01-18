import express from "express";

const app = express();

// Connection
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server running at port: " + PORT);
});
