import express, { urlencoded } from 'express';
import routes from './routes/crudeRoutes';
import statusRoute from './routes/statusRoute';

const app = express();

//Configuração da aplicação
app.use(urlencoded({extended: true}));
app.use(express.json());

//Configaração de rotas
app.use(statusRoute);
app.use(routes);


//Inicialização do servidor
app.listen(3000, () => {
    console.log('Server online at port 3000');
});