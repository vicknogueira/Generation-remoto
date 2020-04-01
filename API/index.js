/*                          
                                API REST

API - Interface de Programação de Aplicativo ou Aplication programming Interface
 Conjunto de rotinas padrões dentro de uma aplicação que tem várias funcionalidades
 depois é craida outra apliação para consumir estas funcionalidades
 Ideia: Uma série de recursos colocado na web e atravez de outra aplicação consigo consumir sem ter que criar essa aplicação do zero (EX: maps, correio)
 
REST - Série de principios/regras que quando seguidas permite a criação de projetos com interfaces bem definidas, na prática você permitiria que suas aplicações pudessem se comunicar


Podemos usar uma ferramenta que vai simular nossas requisições, nesta aula usaremos o 'Insomnia'


Baixamos a extensão JSON viewer no Google Chrome, para visualizar as informações dos nossos livros criados melhor
 */

const express = require("express"); // importando a framework express
const fs = require("fs"); // "fs" é file system, importando para meu projeto o modulo de leitura e escrita de arquivos
const app = express(); //Inicializando o express, geralmente para inicializar o nome da const é chamada de "app"
const bodyParser = require('body-parser');// para poder capturar os dados cadastrados

// para usar o body parser
app.use(bodyParser.urlencoded({extended: false}));// ele traz a requisição para que eu possa usar
app.use(bodyParser.json());// agora com essas duas linhas ja consegui capturar os parametros e fazer o cadastro


// Para fazer a leitura dos arquivos: "rawbooks" - raw em inglês é cru
let rawbooks = fs.readFileSync("books.json");// "readFileSync" - lê o arquivos de forma sincronizada, depois armazana dentro da variável.Sincronia significa que minha aplicação só consegue seguir apenas quando o arquivo for lido por completo, para executar outras tarefas esse arquivo precisa ser lido 
let books = JSON.parse(rawbooks); // a variável "books" pega a variável "rawbooks" e o JSON.parse() converte para o formato .json

app.get('/', (req, res) =>{ // criei uma rota para a raiz
    res.send("Hello World!"); // coloquei uma mensagem
});

// rota pra listar os livros
app.get('/book', (req, res) =>{// Outra rota
    res.json(books); // a resposta irrá devolver um formato .json, nesse caso a variável books que contém o arquivo
})

// rota para cadastrar o livro:
app.post('/book', (req, res) =>{
    const book = req.body; // captura os dados enviados pelo body e guarda na variável, mas para capturar esses dados precisa utilizar o modulo bodyParser do node, ja é padrão do node_modules então o express consegue usar tb
    if(Array.isArray(book)){// verificando se a informação da requisição é um array
        for(item of book){// então para cada item do livro
            books.push(item)// cadastra os livros, adiciona um item a mais ao final do array
        }
    }else{
        books.push(book);
    }
    let jsonList = JSON.stringify(books); // Converte os dados dos livros que está no 'books' para string e armazenar na variável e assim consigo fazer outros cadastros
    fs.writeFile('books.json', jsonList, 'utf8', ()=>{})// escrever os dados que tenho armazenado na variável e coloca-lo dentro do arquivo 'books.json', ('o qnome do arquivo que eu quero armazenar', onde estão, 'padrao de caracteres', ()=>) ()=> é uma fução callBack   
    res.send('Livro cadastrado com sucesso!')
})
// Para localizar uma informação dentro do livro, nesse caso queremos o cósdifo isbn
app.get('/book/:isbn', (req, res) =>{
    const isbn = req.params.isbn; // captura o isbn
    for(let book of books){// procure um livro dentro de livros
        if(book.isbn === isbn){// o book.isbn verifica a string armazanada dentro de books, o isbn sozinho é da variável
            res.json(book);
            return;
        }
    }
    res.status(404).send("Livro não encontrado :(")
})

app.listen(3000);// Escutando uma reqisição na porta que defini