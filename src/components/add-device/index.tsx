'use client'
import { useState, useMemo, createContext } from 'react'
import { Form, Input, Button, notification } from 'antd'
import { GeometryType } from '../../shared/enums'
import { Geometry } from '../../shared/types'
import { NodesAPI } from '../../shared/services/nodes'
import styles from './AddDevice.module.css'

type FieldType = {
    name: string
    uuid: string
    location: string
}

const Context = createContext({ name: 'Add Device Tab Context' })

export const AddDevice = () => {
    const [notificationApi, contextHolder] = notification.useNotification()
    const [isLoading, setIsLoading] = useState(false)
    const contextValue = useMemo(() => ({ name: 'Add Device Tab' }), [])

    const onFinish = async (values: FieldType) => {
        setIsLoading(true)
        try {
            await registerNode(values)
            notificationApi.success({
                message: 'Device registration successful',
                description: 'Successfully registered device',
                placement: 'bottomRight'
            })
        } catch (e) {
            console.error(e)
            notificationApi.error({
                message: 'Device registration failed',
                description: 'Device registration failed. Please check the values again',
                placement: 'bottomRight'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const registerNode = async (values: FieldType) => {
        const coordinates = values?.location?.split(',').map(v => Number(v))
        const location = {
            type: GeometryType.POINT,
            coordinates
        } as Geometry
        const res = await NodesAPI.registerNode({ ...values, location })
        return res
    }

    return (
        <Context.Provider value={contextValue}>
            {contextHolder}
            <div className={styles.addDevice}>
                <Form
                    className={styles.form}
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
                        label='Name'
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter valid device name!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        layout='vertical'
                        label='UUID'
                        name='uuid'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter valid device UUID!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        layout='vertical'
                        label='Location (long,lat,alt)'
                        name='location'
                        rules={[
                            {
                                required: true,
                                message: 'Please pin device location on map!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            block={true}
                            type='primary'
                            htmlType='submit'
                            loading={isLoading}
                        >
                            Add Device
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Context.Provider>
    )
}
