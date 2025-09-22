const express = require('express');
let apiRouter = express.Router();

// Usando 'let' para permitir modificações no array de produtos
let lista_produtos = {
    produtos: [
        { id: 1, descricao: "Portátil i5", valor: 2500.00, marca: "Marca A" },
        { id: 2, descricao: "Rato Gamer", valor: 150.00, marca: "Marca B" },
        { id: 3, descricao: "Monitor 24 polegadas", valor: 950.00, marca: "Marca A" },
    ]
};
let nextProductId = 4;

// Documentação: Dentro de um Router, as rotas são relativas ao ponto onde o router é usado.
// Se o router for usado em '/api', esta rota será acessível como '/api/produtos'.

// READ -> Obter todos os produtos (já iniciado por você)
apiRouter.get('/produtos', function (req, res) {
    res.status(200).json(lista_produtos);
});

// READ -> Obter um produto pelo ID
apiRouter.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = lista_produtos.produtos.find(p => p.id === id);

    if (produto) {
        res.status(200).json(produto);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

// CREATE -> Incluir um novo produto
apiRouter.post('/produtos', (req, res) => {
    const { descricao, valor, marca } = req.body;
    if (!descricao || !valor || !marca) {
        return res.status(400).json({ message: 'Descrição, valor e marca são obrigatórios' });
    }

    const newProduct = {
        id: nextProductId++,
        descricao,
        valor,
        marca
    };

    lista_produtos.produtos.push(newProduct);
    res.status(201).json(newProduct);
});

// UPDATE -> Alterar um produto existente
apiRouter.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = lista_produtos.produtos.findIndex(p => p.id === id);

    if (productIndex !== -1) {
        const { descricao, valor, marca } = req.body;
        const produto = lista_produtos.produtos[productIndex];
        
        produto.descricao = descricao || produto.descricao;
        produto.valor = valor || produto.valor;
        produto.marca = marca || produto.marca;

        res.status(200).json(produto);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

// DELETE -> Excluir um produto
apiRouter.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = lista_produtos.produtos.length;
    lista_produtos.produtos = lista_produtos.produtos.filter(p => p.id !== id);

    if (lista_produtos.produtos.length < initialLength) {
        res.status(204).send(); // Sucesso, sem conteúdo para retornar
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});


module.exports = apiRouter;