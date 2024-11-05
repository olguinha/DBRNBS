const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/escola', {
 useNewUrlParser: true,
 useUnifiedTopology: true
}).then(() => {
 console.log('Conectado ao MongoDB');
}).catch((err) => {
 console.log('Erro ao conectar ao MongoDB:', err);
});


const cursoSchema = new mongoose.Schema({
    codcurso: String,
    nomecurso: String,
    descricao: String,
    carga_horaria_total: Date,
    disciplinas:String
   });


   const Curso = mongoose.model('Curso', cursoSchema);


   app.post('/cursos', (req, res) => {
    const novoCurso = new Curso(req.body);
    novoCurso.save()
    .then((curso) => res.json(curso))
    .catch((err) => res.status(500).send(err));
   });
   
   app.get('/cursos', (req, res) => {
    Curso.find()
    .then((cursos) => res.json(cursos))
    .catch((err) => res.status(500).send(err));
   });
   
   app.put('/cursos/:id', (req, res) => {
    Curso.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((curso) => res.json(curso))
    .catch((err) => res.status(500).send(err));
   });
   
   app.delete('/cursos/:id', (req, res) => {
    Curso.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Curso excluído!' }))
    .catch((err) => res.status(500).send(err));
   });
   

const port = 3000;
app.listen(port, () => {
 console.log(`Servidor rodando na porta ${port}`);
});