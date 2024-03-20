const express = require("express");
const fs = require("fs");
const csv = require("csv");

const app = express();

app.get("/", (req, res) => {
  const arquivoCsv = "arquivo.csv"; //Necessario especificar o caminho do arquivo csv

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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
