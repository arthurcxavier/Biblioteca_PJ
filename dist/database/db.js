"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg_1 = require("pg");
const connectionString = `postgres://${process.env.DB_User}:${process.env.DB_Password}@motty.db.elephantsql.com/dxhkhrst`;
const db = new pg_1.Pool({ connectionString });
exports.default = db;
