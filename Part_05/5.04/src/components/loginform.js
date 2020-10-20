import React, { useState } from 'react'
import LoginService from '../services/login'

const LoginForm = ({setUserHandler, setNotificationMessage}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await LoginService.login({ username, password })
            console.log('logging in with', user)
            setUsername('')
            setPassword('')
            setUserHandler(user)
            setNotificationMessage(`${user.name} logged in`)
        } catch (exception) {
           setNotificationMessage('wrong username of password')
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>Username: <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} /> </div>
                <div>Passward: <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} /></div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm