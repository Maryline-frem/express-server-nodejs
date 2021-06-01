// Importer express
const express = require('express');
const path = require('path');
const axios = require('axios');

// Initialiser l'application
const app = express();

// Lier mon express.JS à un moteur de template (ici: twig)
// 1. On va récupérer mes templates dans le dossier views
app.set('views', path.join(__dirname,'views'));
// 2. Connecter twig à express.js
app.set('view engine', 'twig');

// Rendre automatiquement disponible en URL tout fichier
// dans le dossier public
app.use(express.static('public'))

// Définir le port dans une variable
const port = 4400;

// Routing
app.get('/', (req, res) => {
    res.render('index', {bachi: "Mange tes morts"});
})

app.get('/blog', (req,res) => {
    res.render('blog');
})

app.get('/blog/:id', (req,res) => {
   const id = req.params.id;

   axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
   .then(resAxios => {
       console.log(resAxios.data);

       res.render('article', {myPost: resAxios.data});
   })
})

app.get('/contact', (req,res) => {
    res.render('contact', {mail: "jean-baptiste@pop.eu.com"});
})

// Lance le serveur
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});