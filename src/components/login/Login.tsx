import React, { useEffect } from 'react'
import { useUser } from '../../store/store'
import { useNavigate } from 'react-router-dom'

export function Login() {
	const {
		username,
		password,
		setUsername,
		userLogin,
		setPassword,
		isUserLogged,
		setUserLogged
	} = useUser(state => state)

	const navigate = useNavigate()

	useEffect(() => {
		if (isUserLogged === true) {
			navigate('/home')
			setUserLogged(false)
		}
	}, [isUserLogged, navigate, setUserLogged])

	return (
		<div className='form'>
			<input
				type='text'
				placeholder='username'
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<input
				type='text'
				placeholder='password'
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>

			<button onClick={() => userLogin(username, password)}>userLogin</button>
		</div>
	)
}
