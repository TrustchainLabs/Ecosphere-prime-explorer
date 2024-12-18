import axios from 'axios'
import { SMART_APP_API_URL } from '../constants'

type SignUpParams = {
    username: string
    email: string
    password: string
    tags?: {
        key: string,
        value: string
    }[]
}

type LoginParams = {
    username?: string
    email: string
    password: string
}

export class AuthAPI {
    public static async signUp ({ username, email, password, tags }: SignUpParams) {
        const res =  await axios.post(`${SMART_APP_API_URL}/auth/web2/register`, {
            username,
            email,
            password,
            tags
        })

        // Check if user has a wallet. If not create a new wallet
        // Login user for session
        await this.login({ email, password })

        const userId = res.data?._id || ''
        try {
            await axios.get(`${SMART_APP_API_URL}/wallets/${userId}`, { withCredentials: true })
        } catch (e) {
            console.error(e)

            // Create wallet
            const wallet = await axios.post(
                `${SMART_APP_API_URL}/wallets`,
                {
                    userId
                },
                {
                    withCredentials: true
                }
            )

            res.data.wallet = wallet.data
        }

        // Logout
        await this.logout()

        return res.data
    }

    public static async login ({ username, email, password }: LoginParams) {
        const res =  await axios.post(
            `${SMART_APP_API_URL}/auth/web2/login`,
            {
                username,
                email,
                password
            },
            {
                withCredentials: true
            }
        )
        return res.data
    }

    public static async logout () {
        const res =  await axios.get(`${SMART_APP_API_URL}/auth/web2/logout`, { withCredentials: true })
        return res.data
    }

    public static async validateAuth () {
        const res = await axios.get(`${SMART_APP_API_URL}/auth/profile`, {
            withCredentials: true
        })
        return res.data
    }
}
