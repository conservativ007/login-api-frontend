import React from 'react'
import { useUser } from '../../store/store'

export function Home() {
	const { name } = useUser(state => state)
	return <h1 style={{ textAlign: 'center' }}>Hello {name}!</h1>
}
