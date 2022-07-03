//Conexão com o banco de dados PostgreSQL na nuvem (ElephantSQL)
import { Pool } from "pg";

const connectionString = `postgres://${DB_USER}:${DB_PASSWORD}@motty.db.elephantsql.com/dxhkhrst`;

const db = new Pool({ connectionString });

export default db;
