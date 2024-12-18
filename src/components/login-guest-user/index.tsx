import { useRouter } from 'next/navigation'
import { AuthAPI } from '../../shared/services/auth'
import { GUEST_EMAIL, GUEST_PASSWORD } from '../../shared/constants'
import styles from './LoginGuestUser.module.css'

export const LoginGuestUser = () => {
    const router = useRouter()

    const loginGuestUser = async () => {
        try {
            const res = await AuthAPI.login({
                email: GUEST_EMAIL,
                password: GUEST_PASSWORD
            })
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('operator', JSON.stringify(res.operator))
            localStorage.setItem('user', JSON.stringify(res.user))

            router.push('/')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={styles.guestUser}>
            Use as
            <span
                className={styles.guestUserButton}
                onClick={loginGuestUser}
            >
                guest
            </span>
        </div>   
    )
}
