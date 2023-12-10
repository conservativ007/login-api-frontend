import { create } from 'zustand'
import { CONSTANTS } from '../constants'
import { IUser } from '../types'

export interface User {
	name: string
	username: string
	password: string
	isUserLogged: boolean
	setName: (name: string) => void
	setUsername: (username: string) => void
	setPassword: (password: string) => void
	setUserLogged: (value: boolean) => void
	userSignup: (user: IUser) => void
	userLogin: (username: string, password: string) => void
}

export const useUser = create<User>(set => ({
	title: '',
	name: '',
	username: '',
	password: '',
	isUserLogged: false,
	setUserLogged: value => set(state => ({ ...state, isUserLogged: value })),

	userSignup: async (user: IUser) => {
		const response = await fetch(CONSTANTS.signup, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				...user
			})
		})

		const data = await response.json()
		console.log(data)
	},
	userLogin: async (username: string, password: string) => {
		const response = await fetch(CONSTANTS.login, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		})

		const data = await response.json()
		console.log(data)

		if (response.ok) {
			set(state => ({ ...state, isUserLogged: true }))
			set(state => ({ ...state, name: data.name }))
		}

		if (!response.ok) {
			set(state => ({ ...state, isUserLogged: false }))
		}
	},
	setName: name => set(state => ({ ...state, name })),
	setUsername: username => set(state => ({ ...state, username })),
	setPassword: password => set(state => ({ ...state, password }))
}))
