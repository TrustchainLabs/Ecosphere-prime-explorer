import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AuthAPI } from '../services/auth'

export const useLoggedIn = () => {
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
            router.push('/')
            setIsLoggedIn(true)
        } catch (e) {
            console.error(e)
            setIsLoggedIn(false)
        } finally {
            setIsLoading(false)
        }
    }

    return [isLoggedIn, isLoading]
}
