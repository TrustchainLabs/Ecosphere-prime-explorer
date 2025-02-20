import { useRouter } from 'next/navigation'
import { Button } from 'antd'
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
            <span className={styles.alternateLoginPrompt}>Or continue as</span>
            <Button
                className={styles.guestUserButton}
                variant='outlined'
                block={true}
                onClick={loginGuestUser}
            >
                Guest User
            </Button>
        </div>   
    )
}
