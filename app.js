const express = require("express");
const fs = require("fs");
const db = require("./db/models/index");
const csv = require("csv");
const upload = require("./services/uploadCsvService");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(express.json());

app.post("/", upload.single('arquivo') , (req, res) => {

  if(!req.file){
    res.status(400).send("Erro ao Importar");
  }

  const arquivoCsv = path.join(__dirname, "public/upload/csv", req.file.filename); //Caminho para o arquivo CSV

  fs.createReadStream(arquivoCsv)
    .pipe(
      csv.parse({
        columns: true,
        delimiter: ";", //Informar o delimitador do arquivo csv exemplo: ; | ,
      })
    )
    .on("data", async (dados) => {
      console.log(dados);

      // Função para não importar dados repetidos
      const user = await db.Users.findOne({ //Alterar Users para o seu nome do seu model
        attributes: ["id"],
        where: { cpf: dados.cpf }, //Informar qual coluna ou colunas devem ser unicas
      });

      if (!user) {
        await db.Users.create(dados);
      }
    });

  return res.status(200).send("Importação concluida");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
