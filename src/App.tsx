import React from 'react'
import './App.css'
import { SignUpOrLogin } from './components/signUpOrLogin/signUpOrLogin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/home/Home'

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<SignUpOrLogin />} />
					<Route path='/home' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
