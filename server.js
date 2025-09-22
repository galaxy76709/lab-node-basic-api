require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- "Banco de Dados" em Memória ---
let users = [
  { id: 1, name: 'João Silva', email: 'joao@example.com' },
  { id: 2, name: 'Maria Santos', email: 'maria@example.com' }
];
let nextUserId = 3;

// --- Rotas ---
app.use('/app', express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.send('<h1>API está no ar!</h1><p>Use as rotas /users para o CRUD.</p>');
});

// --- ROTAS DO CRUD PARA UTILIZADORES ---

// READ (Ler) -> Obter todos os utilizadores
app.get('/users', (req, res) => {
  res.json(users);
});

// READ (Ler) -> Obter um utilizador específico pelo ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Utilizador não encontrado' });
  }
});

// CREATE (Criar) -> Criar um novo utilizador
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Nome e email são obrigatórios' });
  }
  const newUser = { id: nextUserId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE (Atualizar) -> Atualizar um utilizador existente
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].name = name || users[userIndex].name;
    users[userIndex].email = email || users[userIndex].email;
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'Utilizador não encontrado' });
  }
});

// DELETE (Apagar) -> Apagar um utilizador
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const initialLength = users.length;
  users = users.filter(u => u.id !== userId);
  if (users.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Utilizador não encontrado' });
  }
});

// --- Inicialização do Servidor ---
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor a correr na porta ${port}`);
});