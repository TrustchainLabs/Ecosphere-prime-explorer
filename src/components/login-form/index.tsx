'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createContext, useState, useMemo } from 'react'
import { Form, Input, Button, notification } from 'antd'
import { LoginGuestUser } from '../login-guest-user'
import { AuthAPI } from '../../shared/services/auth'
import styles from './LoginForm.module.css'

type FieldType = {
    email?: string
    password?: string
}

const Context = createContext({ name: 'Login Page Context' })

export const LoginForm = () => {
    const router = useRouter()
    const [notificationApi, contextHolder] = notification.useNotification()
    const [isLoading, setIsLoading] = useState(false)
    const contextValue = useMemo(() => ({ name: 'Login Page' }), [])

    const onFinish = async (values: FieldType) => {
        setIsLoading(true)
        try {
            const res = await login(values)
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('operator', JSON.stringify(res.operator))
            localStorage.setItem('user', JSON.stringify(res.user))

            router.push('/')
        } catch (e) {
            console.error(e)
            notificationApi.error({
                message: 'Login failed',
                description: 'Unauthorized login credentials',
                placement: 'bottomRight'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (data: FieldType) => {
        const res = await AuthAPI.login({
            email: data?.email || '',
            password: data?.password || ''
        })
        return res
    }

    return (
        <Context.Provider value={contextValue}>
            {contextHolder}
            <div className={styles.container}>
                <div className={styles.title}>
                    <Image
                        src='/images/brand-logo.svg'
                        alt='Brand Logo'
                        width={32}
                        height={32}
                    />
                    <Image
                        src='/images/brand-title.svg'
                        alt='Brand Title'
                        width={240}
                        height={40}
                    />
                </div>
                <div className={styles.loginForm}>
                    <Form
                        name='basic'
                        layout='vertical'
                        labelAlign='left'
                        autoComplete='off'
                        size='large'
                        clearOnDestroy={true}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            layout='vertical'
                            label='Email'
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter valid email!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            layout='vertical'
                            label='Password'
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter valid password!'
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                block={true}
                                type='primary'
                                htmlType='submit'
                                loading={isLoading}
                            >
                                Login
                            </Button>
                        </Form.Item>
                        <Form.Item
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {`Don't have an account? Sign up`}
                            <Link
                                href='/sign-up'
                                style={{
                                    marginLeft: '4px'
                                }}
                            >
                                here
                            </Link>
                        </Form.Item>
                    </Form>
                </div>
                <LoginGuestUser />
            </div>
        </Context.Provider>
    )
}
