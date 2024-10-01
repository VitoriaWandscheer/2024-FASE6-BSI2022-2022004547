const mainForm = document.querySelector('form')

void async function () {
  const response = await fetch('/users') // Pede para o servidor buscar todos os registros da tabela users do banco de dados.
  const users = await response.json() // Pega a resposta do servidor e monta essa resposta em um arquivo json.
  // Abaixo, para cada registro no banco monta um novo formulário com os dados do usuário.
  users.forEach(user => {
    const newForm = mainForm.cloneNode(true)
    newForm.name.value = user.name
    console.log(user.name);
    newForm.email.value = user.email
    newForm.dataset.id = user.id
    mainForm.before(newForm)
  })
  console.log(users)
}()

document.addEventListener('submit', async (event) => {
  event.preventDefault()
  const action = event.submitter.dataset.action ?? null // submitter: pega o elemento que gerou o evento.
  const currentForm = event.target // target: pega o formulário do elemento que gerou o evento.
  
  if (action === 'delete') {
    const id = currentForm.dataset.id
    const method = 'DELETE'
    const url = `/users/${id}`
    const response = await fetch(url, { method })
    if (!response.ok)
      return console.error('Error:', response.statusText)
    currentForm.remove()
    return
  }
  
  if (action === 'update') {
    const id = currentForm.dataset.id
    const method = 'PUT'
    const url = `/users/${id}`
    const headers = { 'Content-Type': 'application/json' }
    const name = currentForm.name.value
    const email = currentForm.email.value
    const body = JSON.stringify({ name, email })
    const response = await fetch(url, { method, headers, body })
    if (!response.ok)
      return console.error('Error:', response.statusText)
    return
  }
  
  if (action === 'create') {
    const method = 'POST'
    const url = '/users'
    const headers = { 'Content-Type': 'application/json' }
    const name = currentForm.name.value
    const email = currentForm.email.value
    const body = JSON.stringify({ name, email })
    const response = await fetch(url, { method, headers, body })
    if (!response.ok)
      return console.error('Error:', response.statusText)
    const responseData = await response.json()
    const newForm = mainForm.cloneNode(true)
    newForm.name.value = responseData.name
    newForm.email.value = responseData.email
    newForm.dataset.id = responseData.id
    mainForm.reset()
    mainForm.before(newForm)
    return
  }
})