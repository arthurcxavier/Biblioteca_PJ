require('dotenv').config()
import express, { Request, Response, urlencoded } from 'express';
import routes from './routes/crudeRoutes';
import welcomeRoute from './routes/welcomePage';

const app = express();

const db = process.env.S3_BUCKET

//Configuração da aplicação
app.use(urlencoded({extended: true}));
app.use(express.json());

//Configaração de rotas
app.use(welcomeRoute);
app.use(routes);


//Inicialização do servidor
app.listen(3000, () => {
    console.log('Server online at port 3000');
});