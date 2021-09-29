//Base do Setup da Aplicação:

/* Chamada das Packages que iremos precisar para a nossa aplicação */
var express = require('express'); //chamando o pacote express
var app = express(); //definção da nossa aplicação através do express
var bodyParser = require('body-parser');  //chamando o pacote body-parser
var _ = require('underscore');

/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Definição da porta onde será executada a nossa aplicação */
var port = process.env.PORT || 8000;

//Rotas da nossa API:
//==============================================================

/* Aqui o 'router' irá pegar as instâncias das Rotas do Express */
var router = express.Router();


var _data = [
    {
        "id": 2,
        "title": "Galaxy Note S20 Ultra",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing.",
        "image": "https://tecnoblog.net/wp-content/uploads/2020/09/samsung-galaxy-note-20-ultra-review-11.jpg",
        "featured": true,
        "value": 4000,
        "createdAt": "2020-03-22"
    },
    {
        "id": 2,
        "title": "Iphone 23",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing.",
        "image": "https://malibushop.com.br/wp-content/uploads/2021/03/i12-mini.jpg",
        "value": 27000,
        "createdAt": "2020-03-27"
    },
    {
        "id": 3,
        "title": "TV LG 55",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing.",
        "image": "https://i.zst.com.br/thumbs/12/25/19/1142658346.jpg",
        "value": 27000,
        "createdAt": "2020-03-21"
    }
];
var _counter = _data.length;


/* Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000/api) */
router.get('/products', function (req, res) {
    res.json(_data);
});

router.get('/products/:id', function (req, res) {

    var id = req.params.id;
    var item = _.find(_data, function (item) {
        return item.id == id;
    });

    res.json(item ? item : {});
});


router.post('/products', function (req, res) {
    console.log(req.body);
    var item = req.body;
    _counter = _counter + 1;
    item.id = _counter;
    _data.push(item);

    res.json(item);
});

router.put('/products', function (req, res) {



    var item = req.body;

    if (!item.id) {
        res.json({});
    }

    var index = _.findIndex(_data, function (itemFromArray) {
        return itemFromArray.id == item.id;
    });

    if (index != -1) {
        _data[index] = item;
    }

    res.json(item);
});

router.delete('/products', function (req, res) {

    var item = req.body;

    if (!item.id) {
        res.json({});
    }

    var index = _.findIndex(_data, function (itemFromArray) {
        return itemFromArray.id == item.id;
    });

    if (index != -1) {
        _data.splice(index, 1);
    }

    res.json(item);
});

/* TODO - Definir futuras rotas aqui!!! */

/* Todas as nossas rotas serão prefixadas com '/api' */
app.use('/api', router);

//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);