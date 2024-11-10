const usersTableBody = document.getElementById('users-tbody')

void async function () {
  const response = await fetch('/users') // Pede para o servidor buscar todos os registros da tabela users do banco de dados.
  const users = await response.json() // Pega a resposta do servidor e monta essa resposta em um arquivo json.
  // Abaixo, para cada registro no banco monta um novo formulário com os dados do usuário.
  users.forEach(user => {
    const userRow = document.createElement('tr')
    const userName = document.createElement('td')
    const userMail = document.createElement('td')
    userName.innerText = user.name
    userMail.innerText = user.email
    userRow.dataset.id = user.id
    userRow.appendChild(userName)
    userRow.appendChild(userMail)
    usersTableBody.appendChild(userRow)
  })
}()