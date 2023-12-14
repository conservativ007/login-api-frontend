import React, { useEffect } from 'react'
import { useUser } from '../../store/store'
import { useNavigate } from 'react-router-dom'

export function Home() {
	const { name, setUserLogged, isUserLogged } = useUser(state => state)

	const navigate = useNavigate()

	const exitToStartPage = () => {
		navigate('/')
		setUserLogged(false)
	}

	useEffect(() => {
		if (isUserLogged === false) navigate('/')
	}, [isUserLogged, navigate])

	return isUserLogged === true ? (
		<div className='home'>
			<h1 style={{ textAlign: 'center' }}>Hi {name} you're logged in.</h1>
			<button onClick={exitToStartPage}>exit</button>
		</div>
	) : (
		<></>
	)
}
