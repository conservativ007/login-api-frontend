import React, { useEffect, useState } from 'react'
import { Signup } from '../signup/Signup'
import { Login } from '../login/Login'
import './style.scss'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { useUser } from '../../store/store'
import { useNavigate } from 'react-router-dom'

export function SignUpOrLogin() {
	const [login, setLogin] = useState(false)

	const { reloadPage } = useUser(state => state)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem('token')
			if (token) {
				const x = await reloadPage(token)
				if (x !== undefined) {
					navigate('/home')
				}
			}
		}

		fetchData()
	}, [reloadPage, navigate])

	return (
		<div>
			<div className='signup'>
				<p
					className={login === true ? '' : 'active'}
					onClick={() => setLogin(false)}
				>
					SignUp
				</p>
				<p
					className={login === true ? 'active' : ''}
					onClick={() => setLogin(true)}
				>
					Login
				</p>
			</div>
			{login === true ? <Login /> : <Signup />}
			<ToastContainer />
		</div>
	)
}
