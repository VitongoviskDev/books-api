import express from 'express';
import dbConnection from './config/dbConnect.js';
import routes from './routes/index.js';

dbConnection.on("error", console.log.bind(console, 'Erro ao tentar conectar com banco de dados'));
dbConnection.once("open", () => {
    console.log('Conexão com banco de dados feita com sucesso!');
})

const app = express();
app.use(
    express.json(),
    (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
routes(app);

export default app;