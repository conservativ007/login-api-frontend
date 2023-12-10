import React from 'react'
import { useUser } from '../../store/store'

export function Signup() {
	const {
		name,
		username,
		password,
		setName,
		setUsername,
		userSignup,
		setPassword
	} = useUser(state => state)

	return (
		<div className='form'>
			<input
				type='text'
				placeholder='name'
				value={name}
				onChange={e => setName(e.target.value)}
			/>
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

			<button onClick={() => userSignup({ name, username, password })}>
				SignUp
			</button>
		</div>
	)
}
