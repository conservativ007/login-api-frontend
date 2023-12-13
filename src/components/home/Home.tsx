import React from 'react'
import { useUser } from '../../store/store'
import { useNavigate } from 'react-router-dom'

export function Home() {
	const { name, setUserLogged } = useUser(state => state)

	const navigate = useNavigate()

	const exitToStartPage = () => {
		navigate('/')
		setUserLogged(false)
	}

	return (
		<div className='home'>
			<h1 style={{ textAlign: 'center' }}>Hi {name} you're logged in.</h1>
			<button onClick={exitToStartPage}>exit</button>
		</div>
	)
}
