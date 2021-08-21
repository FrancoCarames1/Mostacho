const Desafio2 = require('./src/clase.js');

let animes = new Desafio2('./archivo.json');

const express = require('express');

const hadlebars = require('express-handlebars');

const app = express();

const PORT = 8080;

app.listen(PORT, () =>{
    console.log("servidor http://localhost:8080/")
});

const router = express.Router();

app.engine(
    'hbs',
    hadlebars({
        extname: '.hbs',
        defaultLayout: 'index',
        layoutsDir:'./views'
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/productos', router);

app.set('view engine', 'hbs');

app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('main', {layout: 'index'})
});

router.get("/", async (req, res) =>{
    let mostrar = await animes.getAll()
    res.render('productos', {layout: 'index', mostrar})
});

app.get('/server', (req, res) => {
    res.send({server: 'Express'})
});

router.post('/', async (req, res) => {

    const { body } = req;

    console.log(body)

    await animes.save(body);

    res.writeHead(301, {'Location': '/'})

    res.send()
});