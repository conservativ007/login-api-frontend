export interface IToken {
	accessToken: string
}

export type IUser = {
	id: number
	name: string
	username: string
	password: string
}

export type UserWithoutId = Omit<IUser, 'id'>
