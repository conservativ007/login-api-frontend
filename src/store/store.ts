import { create } from 'zustand'
import { CONSTANTS } from '../constants'
import { IUser } from '../types'
import { useToast } from '../hooks/useToasts'

const UseTest = useToast

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
		try {
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

			if (!response.ok) {
				data.message.forEach((message: string) => UseTest(false, message))
			}

			if (response.ok) {
				UseTest(
					true,
					'registration has been successfully completed, you can now log in'
				)
			}
		} catch (error) {
			console.log(error)
		}
	},
	userLogin: async (username: string, password: string) => {
		try {
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

			if (response.ok) {
				set(state => ({ ...state, isUserLogged: true }))
				set(state => ({ ...state, name: data.name }))

				console.log(data)
			}

			if (!response.ok) {
				set(state => ({ ...state, isUserLogged: false }))
				data.message.forEach((message: string) => UseTest(false, message))
			}
		} catch (error) {
			console.log(error)
		}
	},
	setName: name => set(state => ({ ...state, name })),
	setUsername: username => set(state => ({ ...state, username })),
	setPassword: password => set(state => ({ ...state, password }))
}))
