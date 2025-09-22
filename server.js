require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Rotas ---

app.use('/app', express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => 
{res.send('<h1>API está no ar!</h1><p>Bem-vindo ao meu projeto.</p>');
});


// --- Inicialização do Servidor ---
// Documentação: Esta parte inicia o servidor e o faz "ouvir" por pedidos na porta definida.
let port = process.env.PORT || 3000;
app.listen(port, () => {
  // Uma mensagem no terminal para sabermos que o servidor iniciou com sucesso.
  console.log(`Servidor a correr na porta ${port}`);
});