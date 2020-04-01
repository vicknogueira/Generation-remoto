// Aplicação utilizando o node, instalando a framework express e construindo rotas

const express = require("express"); // importei o express nesta linha

const app = express(); // inicializando, cria uma aplicação express
// isso é uma rota:
app.get('/', (req, res) =>{// essa rota '/' vai pra raiz
    res.send('Hello World :)!') // como não tenho nenhuma requisição, vou enviar uma mensagem
})
//Isso é outra rota:
app.get('/contato', (re1, res) =>{// '/contato"' é outra rota que pra ser acessado localhost:porta/nomedarota
    res.send("Bem vindo a página de contato!")
})



//inicializar a aplicação:
app.listen(3000)// escuta a porta do servidor, e quando ocorrer uma requisição naquela porta ele inicializa a aplicação ja abrindo na rota definida
