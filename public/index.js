const email = document.getElementById('email')
const password = document.getElementById('password')
const button = document.getElementById('button')

let token = null

button.addEventListener('click', async () => {
  const emailValue = email.value
  const passwordValue = password.value

  try {
    const response = await fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    token = await response.json()
  } catch (error) {
    console.log(JSON.stringify(error))
  }
})

const button2 = document.getElementById('button2')

button2.addEventListener('click', async () => {
  if (!token) {
    console.log('not logged in')
    return
  }

  try {
    const response = await fetch('/users', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        authorization: 'Bearer ' + token,
      },
    })

    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(JSON.stringify(error))
  }
})
