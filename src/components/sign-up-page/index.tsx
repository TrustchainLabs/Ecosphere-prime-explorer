'use client'
import { SignUpForm } from '../sign-up-form'
import { LoadingOverlay } from '../common/loading-overlay'
import { useLoggedIn } from '../../shared/hooks/use-logged-in'
import styles from './SignUpPage.module.css'

export const SignUpPage = () => {
    const [isLoggedIn, isLoading] = useLoggedIn()

    if (isLoggedIn || isLoading) {
        return (
            <LoadingOverlay />
        )
    }

    return (
        <div className={styles.container}>
            <SignUpForm />
        </div>
    )
}
