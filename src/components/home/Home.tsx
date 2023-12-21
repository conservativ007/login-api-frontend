import React, { useEffect } from 'react'
import { useUser } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import './style.scss'

export function Home() {
	const { name, accessToken, setAccessToken, refresh } = useUser(state => state)

	const navigate = useNavigate()

	const exitToHomePage = () => {
		navigate('/')
		setAccessToken(undefined)
		localStorage.setItem('token', '')
	}

	const getRefresh = async () => {
		if (accessToken === undefined) return
		await refresh(accessToken)
	}

	useEffect(() => {
		if (accessToken === undefined) {
			navigate('/')
		}
	}, [navigate, accessToken])

	if (accessToken !== undefined) {
		return (
			<div className='home'>
				<h1 style={{ textAlign: 'center' }}>Hi {name} you're logged in.</h1>
				<div>
					<button onClick={exitToHomePage}>exit</button>
					<button onClick={getRefresh}>refresh</button>
				</div>
			</div>
		)
	} else {
		return <></>
	}
}
