import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AuthAPI } from '../services/auth'

export const usePrivateRoute = () => {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        validate()
    }, [])

    const validate = async () => {
        setIsLoading(true)
        try {
            await AuthAPI.validateAuth()
            setIsLoggedIn(true)
        } catch (e) {
            console.error(e)
            router.push('/login')
            setIsLoggedIn(false)
        } finally {
            setIsLoading(false)
        }
    }

    return [isLoggedIn, isLoading]
}
