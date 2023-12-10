import React, { useState } from 'react'
import { Signup } from '../signup/Signup'
import { Login } from '../login/Login'
import './style.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function SignUpOrLogin() {
	const [login, setLogin] = useState(false)

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
