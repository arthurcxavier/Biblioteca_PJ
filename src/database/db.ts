//Conexão com o banco de dados PostgreSQL na nuvem (ElephantSQL)
import 'dotenv/config';
import { Pool } from "pg";

const connectionString = `postgres://${process.env.DB_User}:${process.env.DB_Password}@motty.db.elephantsql.com/dxhkhrst`;

const db = new Pool({ connectionString });

export default db;
