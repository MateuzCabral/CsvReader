const express = require("express");
const fs = require("fs");
const db = require('./db/models/index');
const csv = require("csv");

require('dotenv').config()

const app = express();

app.get("/", (req, res) => {
  const arquivoCsv = "arquivo.csv"; //Arquivo csv que será lido

  fs.createReadStream(arquivoCsv).pipe(
    csv.parse({
      columns: true,
      delimiter: ';',
    })
  ).on('data',async (dadosLinha) =>{
    var dados = dadosLinha;
    console.log(dados);
  });

  return res.status(200).send("Importação concluida");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
