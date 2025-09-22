require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Importar e Usar o Router ---
// Documentação: Importamos o nosso router de produtos do ficheiro que criámos.
const apiRouter = require('./api/routes/apiRouter'); 

// Documentação: Montamos o router no prefixo '/api'.
// Todos os pedidos que começarem com '/api' serão geridos pelo apiRouter.
// Ex: um pedido para '/api/produtos' será tratado pela rota '/produtos' dentro do apiRouter.
app.use('/api', apiRouter);


// --- Rotas Principais (se ainda precisar delas) ---
app.get('/', (req, res) => {
  res.send('<h1>API está no ar!</h1><p>Acesse /api/produtos para ver os produtos.</p>');
});


// NOTA: O CRUD de 'users' e 'products' que estava aqui foi removido
// porque a lógica de produtos agora está no seu próprio router.


// --- Inicialização do Servidor ---
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor a correr na porta ${port}`);
});