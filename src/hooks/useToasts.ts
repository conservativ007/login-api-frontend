import { Theme, toast } from 'react-toastify'

export const useToast = (success: boolean, message: string) => {
	const defaultTheme = {
		position: 'top-center' as const,
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'dark' as Theme
	}

	if (success === true) {
		toast(message, defaultTheme)
		return
	}

	toast.error(message, defaultTheme)
}
