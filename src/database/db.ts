import { Pool } from "pg";

const connectionString = `postgres://dxhkhrst:GyzETEJBwWj1_DAb1AgY1iz04tVFevnx@motty.db.elephantsql.com/dxhkhrst`;

const db = new Pool({ connectionString });

export default db;