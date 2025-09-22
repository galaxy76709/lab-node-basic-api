require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- "Banco de Dados" em Memória para Utilizadores ---
let users = [
  { id: 1, name: 'João Silva', email: 'joao@example.com' },
  { id: 2, name: 'Maria Santos', email: 'maria@example.com' }
];
let nextUserId = 3;

// --- "Banco de Dados" em Memória para Produtos ---
let products = [
  { id: 101, nome: 'Portátil Gamer', preco: 1200.50, estoque: 15 },
  { id: 102, nome: 'Rato sem Fios', preco: 25.00, estoque: 50 }
];
let nextProductId = 103;


// --- Rotas Principais ---
app.use('/app', express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
  res.send('<h1>API está no ar!</h1><p>Rotas disponíveis: /users e /produtos</p>');
});

// --- ROTAS DO CRUD PARA UTILIZADORES ---
// ... (todo o código do CRUD de utilizadores que já tínhamos)
app.get('/users', (req, res) => { res.json(users); });
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) res.json(user); else res.status(404).json({ message: 'Utilizador não encontrado' });
});
app.post('/users', (req, res) => {
  const newUser = { id: nextUserId++, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});
app.put('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'Utilizador não encontrado' });
  }
});
app.delete('/users/:id', (req, res) => {
  const initialLength = users.length;
  users = users.filter(u => u.id !== parseInt(req.params.id));
  if (users.length < initialLength) res.status(204).send();
  else res.status(404).json({ message: 'Utilizador não encontrado' });
});


// --- ROTAS DO CRUD PARA PRODUTOS (Seguindo a imagem) ---
app.post('/produtos', (req, res) => {
  const { nome, preco, estoque } = req.body;
  if (!nome || preco === undefined || estoque === undefined) return res.status(400).json({ message: 'Nome, preço e estoque são obrigatórios' });
  const newProduct = { id: nextProductId++, nome, preco, estoque };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
app.get('/produtos', (req, res) => { res.json(products); });
app.get('/produtos/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) res.json(product); else res.status(404).json({ message: 'Produto não encontrado' });
});
app.put('/produtos/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...req.body };
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});
app.delete('/produtos/:id', (req, res) => {
  const initialLength = products.length;
  products = products.filter(p => p.id !== parseInt(req.params.id));
  if (products.length < initialLength) res.status(204).send();
  else res.status(404).json({ message: 'Produto não encontrado' });
});


// --- Inicialização do Servidor ---
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor a correr na porta ${port}`);
});