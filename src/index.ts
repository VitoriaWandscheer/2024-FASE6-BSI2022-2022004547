import express from 'express'
import { connect } from './database'

const port = 3000
const app = express()

app.use(express.json()) //transforma arquivo json em um objeto.
app.use(express.static(__dirname + '/../public')) // Entrega os arquivos estáticos para o cliente.

app.get('/users', async (req, res) => {
  const db = await connect() // Estabelece a conexão com o BD.
  const users = await db.all('SELECT * FROM users') // Faz a requisição para o Banco de Dados.
  res.json(users) // Pega a resposta do Banco de Dados e transforma essa resposta em um arquivo json.
})

app.post('/users', async (req, res) => {
  const db = await connect()
  const { name, email } = req.body
  const result = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email])
  const user = await db.get('SELECT * FROM users WHERE id = ?', [result.lastID])
  res.json(user)
})

app.put('/users/:id', async (req, res) => {
  const db = await connect()
  const { name, email } = req.body
  const { id } = req.params
  await db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id])
  const user = await db.get('SELECT * FROM users WHERE id = ?', [id])
  res.json(user)
})

app.delete('/users/:id', async (req, res) => {
  const db = await connect()
  const { id } = req.params
  await db.run('DELETE FROM users WHERE id = ?', [id])
  res.json({ message: 'User deleted' })
})

app.listen(port, () => {
  console.log(`⚡ Server running on port ${port}`)
})