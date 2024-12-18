'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createContext, useState, useMemo } from 'react'
import { Form, Input, Button, notification } from 'antd'
import { LoginGuestUser } from '../login-guest-user'
import { AuthAPI } from '../../shared/services/auth'
import { UserType } from '../../shared/enums'
import styles from './SignUpForm.module.css'

type FieldType = {
    username?: string
    email?: string
    password?: string
}

const Context = createContext({ name: 'Sign Up Page Context' })

export const SignUpForm = () => {
    const router = useRouter()
    const [notificationApi, contextHolder] = notification.useNotification()
    const [isLoading, setIsLoading] = useState(false)
    const contextValue = useMemo(() => ({ name: 'Sign Up Page' }), [])

    const onFinish = async (values: FieldType) => {
        setIsLoading(true)
        try {
            await signUp(values)
            router.push('/')
        } catch (e) {
            console.error(e)
            notificationApi.error({
                message: 'Sign up failed',
                description: 'Invalid sign up details',
                placement: 'bottomRight'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const signUp = async (data: FieldType) => {
        const res = await AuthAPI.signUp({
            username: data?.username || '',
            email: data?.email || '',
            password: data?.password || '',
            tags: [
                {
                    key: 'type',
                    value: UserType.PROVIDER
                }
            ]
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
                <div className={styles.signUpForm}>
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
                            label='Username'
                            name='username'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter valid username!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
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
                                Sign Up
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
                            Already have an account? Log in
                            <Link
                                href='/login'
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
