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
