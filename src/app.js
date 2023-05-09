import express from 'express';
import dbConnection from './config/dbConnect.js';
import routes from './routes/index.js';

dbConnection.on("error", console.log.bind(console, 'Erro ao tentar conectar com banco de dados'));
dbConnection.once("open", () => {
    console.log('Conexão com banco de dados feita com sucesso!');
})

const app = express();
app.use(
    express.json()
)
routes(app);

export default app;