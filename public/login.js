const form = document.getElementById('login-form')

form?.addEventListener('submit', async (event) => {
    event.preventDefault()
    
    const response = await fetch('/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: form.email.value,
            password: form.password.value
        })
    })

    const responseData = await response.json()

    if (!response.ok) {
        alert("o servidor nos disse: " + responseData.message)
        return
    }

    localStorage.setItem('token', responseData.token)
    localStorage.setItem('userName', responseData.userName)
    localStorage.setItem('userEmail', responseData.userEmail)
    localStorage.setItem('userId', responseData.userId)

    location.href = '/home.html'
})