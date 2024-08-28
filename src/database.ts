import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';

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
      email TEXT
    )
  `);

  instance = db;
  return db;
}