const express = require("express");

const app = express();

//Exemplo Query Params
app.get('/users', (req, res) =>{
    // res.send("Esta funfando :D")
    const nome = req.query.nome;// também posso fazer assim de acordo com a nova versão do ECMAscript: const {nome} = req.query;
    const idade = req.query.idade;
    res.json({nome: `${nome}`, idade: `${idade}`})// Retornando para o usuario em forma de JSON

})// Quando eu rodar irá aparecer nome: undefined, dai vai na URL e do lado coloca ?nome=seunome. EX.: http://localhost:3000/users?nome=Vitoria

// Exemplo Route Params
app.get('/contato/:id', (req, res) =>{
    const {id} = req.params;
    res.json({id: `${id}`});
})// Quando eu rodar irá aparecer erro, dai vai na URL e do lado coloca um número ou nome EX.: http://localhost:3000/contato/4

app.listen(3000); // Nesta aula usamos também a extensão Live server, apenas clique no botão da barra inferior do VSCode onde vem escrito "Go Live", para rodar o servidor use o node (nomedoarquivo)

// Formas de capturar informações vindas de uma rota:

// Query Params - Quando você faz alguma consulta pela URL, geralmente com = ?nome=Vitoria
// Route Params = http://localhost:3000/users/1 -Informações que consigo capturar pela URL, aqui estamos acessando diretamente pela rota, altero a rota
// Request Body = {"id": 1} aqui eu capturo ele e faço o que quiser - não mexeremos com ele nesta aula