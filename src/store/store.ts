import { create } from 'zustand'
import { CONSTANTS } from '../constants'
import { UserWithoutId } from '../types'
import { useToast } from '../hooks/useToasts'
import { decodeToken, getRefresh, getUserSignup } from './actions'

const UseTest = useToast

export interface SliceUser {
	userId: number
	name: string
	username: string
	password: string
	accessToken: string | undefined
	setAccessToken: (token: string | undefined) => void
	setName: (name: string) => void
	setUsername: (username: string) => void
	reloadPage: (token: string) => void
	setPassword: (password: string) => void
	userSignup: (user: UserWithoutId) => void
	userLogin: (username: string, password: string) => void
	refresh: (token: string) => void
	userLogOut: () => void
}

export const useUser = create<SliceUser>(set => ({
	title: '',
	userId: 0,
	name: '',
	username: '',
	password: '',
	accessToken: undefined,
	refresh: async (token: string) => {
		const data = await getRefresh(token)
		if (data !== false) {
			set(state => ({ ...state, accessToken: data.accessToken }))
			localStorage.setItem('token', data.accessToken)
		}
	},
	reloadPage: async (token: string) => {
		try {
			const data = await decodeToken(token)
			set(state => ({ ...state, accessToken: data.accessToken }))
			set(state => ({ ...state, userId: data.userId }))
			set(state => ({ ...state, name: data.name }))
			return data
		} catch (error) {
			console.log(error)
		}
	},
	userLogOut: async () => {
		try {
			await fetch(CONSTANTS.logout, {
				method: 'GET'
			})
		} catch (error) {
			console.log(error)
		}
	},
	setAccessToken: token => set(state => ({ ...state, accessToken: token })),

	userSignup: async (user: UserWithoutId) => {
		const someUser = await getUserSignup(user)
		if (someUser.error === false) {
			UseTest(
				true,
				'registration has been successfully completed, you can now log in'
			)
		}

		if (someUser.error === true) {
			someUser.messages?.forEach((message: string) => UseTest(false, message))
		}
	},
	userLogin: async (username: string, password: string) => {
		try {
			const response = await fetch(CONSTANTS.login, {
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify({
					username,
					password
				})
			})

			const data = await response.json()

			if (response.ok) {
				set(state => ({ ...state, accessToken: data.accessToken }))
				set(state => ({ ...state, userId: data.userId }))
				set(state => ({ ...state, name: data.name }))
				localStorage.setItem('token', data.accessToken)
			}

			if (!response.ok) {
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
