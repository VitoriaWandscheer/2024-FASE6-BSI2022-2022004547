import { connect } from '../database'
import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'

const getManyUsers: RequestHandler = async (req, res) => {
    const db = await connect() // Estabelece a conexão com o BD.
    const users = await db.all('SELECT * FROM users') // Faz a requisição para o Banco de Dados.
    res.json(users) // Pega a resposta do Banco de Dados e transforma essa resposta em um arquivo json.
}

const createUser: RequestHandler = async (req, res) => {
    const db = await connect()
    const { name, email, password } = req.body
    const newPassword = await bcrypt.hash(password, 10)
    const result = await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, newPassword])
    const user = await db.get('SELECT * FROM users WHERE id = ?', [result.lastID])
    res.json(user)
}

const updateUser: RequestHandler = async (req, res) => {
  const db = await connect()
  const { name, email, password } = req.body
  const newPassword = await bcrypt.hash(password, 10)
  const { id } = req.params
  await db.run('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, newPassword, id])
  const user = await db.get('SELECT * FROM users WHERE id = ?', [id])
  res.json(user)
}

const deleteUser: RequestHandler = async (req, res) => {
  const db = await connect()
  const { id } = req.params
  await db.run('DELETE FROM users WHERE id = ?', [id])
  res.json({ message: 'User deleted' })
}

export default {
    getManyUsers,
    createUser,
    updateUser,
    deleteUser
}