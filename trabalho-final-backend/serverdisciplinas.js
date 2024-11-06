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



const disciplinasSchema = new mongoose.Schema({
   coddisciplina: String,
   nomedisciplina: String,
   ementa: String,
   Carga_horaria: Date,
   professores: String

});

const Disciplina = mongoose.model('Disciplina', disciplinasSchema);

   app.post('/disciplinas', (req, res) => {
    const novoDisciplina = new Disciplina(req.body);
    novoDisciplina.save()
    .then((disciplinas) => res.json(disciplinas))
    .catch((err) => res.status(500).send(err));
   });
   
   app.get('/disciplinas', (req, res) => {
    Disciplina.find()
    .then((disciplinas) => res.json(disciplinas))
    .catch((err) => res.status(500).send(err));
   });
   
   app.put('/disciplinas/:id', (req, res) => {
    Disciplina.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((disciplinas) => res.json(disciplinas))
    .catch((err) => res.status(500).send(err));
   });
   
   app.delete('/disciplinas/:id', (req, res) => {
    Disciplina.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Disciplina excluído!' }))
    .catch((err) => res.status(500).send(err));
   });

const port = 3000;
app.listen(port, () => {
 console.log(`Servidor rodando na porta ${port}`);
});