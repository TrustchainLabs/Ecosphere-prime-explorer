'use client'
import { LoginForm } from '../login-form'
import { LoadingOverlay } from '../common/loading-overlay'
import { useLoggedIn } from '../../shared/hooks/use-logged-in'
import styles from './LoginPage.module.css'

export const LoginPage = () => {
    const [isLoggedIn, isLoading] = useLoggedIn()

    if (isLoggedIn || isLoading) {
        return (
            <LoadingOverlay />
        )
    }

    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    )
}
