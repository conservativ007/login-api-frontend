import { CONSTANTS } from '../constants'
import { UserWithoutId } from '../types'
import { isTokenExpired } from '../utils/isTokenExpired'

export interface IAccessToken {
	accessToken: string
}

export interface IName {
	name: string
}

export interface IGetUserSignup {
	error: boolean
	messages?: string[]
}

// 1. we are sending refresh token in cookie and set
// 2. server set refreshToken in cookie
// 3. server return accessToken in payload
export const getRefresh = async (
	token: string
): Promise<IAccessToken | false> => {
	const getIsTokenExpired = isTokenExpired(token)
	if (getIsTokenExpired === true) {
		try {
			const responseData = await fetch(CONSTANTS.refresh, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			})
			const response = await responseData.json()
			return response
		} catch (error) {
			console.log(error)
		}
	}
	return false
}

// sending token in headers and userId in url to find user
// is user exist server will return user
export const getProfile = async (
	token: string,
	id: number
): Promise<IName | false> => {
	console.log('getProfile')
	console.log(id)
	try {
		const responseData = await fetch(`${CONSTANTS.profile}/${id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})

		if (!responseData.ok) {
			return false
		}

		const data = await responseData.json()
		return data
	} catch (error) {
		console.log(error)
		return false
	}
}

// create user
export const getUserSignup = async (
	user: UserWithoutId
): Promise<IGetUserSignup> => {
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

		if (response.ok) {
			return { error: false }
		} else {
			return { error: true, messages: data.message || [] }
		}
	} catch (error) {
		console.log(error)
		return { error: true }
	}
}

export const decodeToken = async (token: string) => {
	try {
		const response = await fetch(CONSTANTS.reload, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				token
			})
		})

		const data = await response.json()

		if (response.ok) {
			return data
		} else {
			console.log(data.message)
		}
	} catch (error) {
		console.log(error)
	}
}
