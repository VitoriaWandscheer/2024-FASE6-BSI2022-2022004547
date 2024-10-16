import { open, Database } from 'sqlite'
import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'

let instance: Database | null = null;

export async function connect() { // Esta é uma factory function / singleton
  if (instance) return instance; // Se a instancia já existir retorna a instancia. Se não existir, segue executando o restante da função. 

  const db = await open({
     filename: 'database.sqlite',
     driver: sqlite3.Database
   });
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT NOT NULL UNIQUE,
      password TEXT
    )
  `);

  const password = await bcrypt.hash('123123', 10)

  await db.exec(`
    INSERT OR REPLACE INTO users (id, name, email, password) 
      VALUES (1, 'Susan Bar', 'susan@mail.com', '${password}')
  `)

  instance = db;
  return db;
}