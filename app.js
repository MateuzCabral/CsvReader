const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  return res.send("Importação concluida.");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
