import { useRouter } from 'next/navigation'
import { Dropdown, Avatar, Tooltip } from 'antd'
import { FaRegUser } from 'react-icons/fa6'
import { AuthAPI } from '../../shared/services/auth'
import styles from './UserTab.module.css'

type UserTabProps = {
    className?: string
}

export const UserTab = ({ className = '' }: UserTabProps) => {
    const router = useRouter()
    const user = JSON.parse(localStorage.getItem('user') as string)

    const logout = async () => {
        await AuthAPI.logout()
        localStorage.clear()
        router.push('/login')
    }

    return (
        <Dropdown
            menu={{
                items: [
                    {
                        key: 'logout',
                        label: 'Logout',
                        onClick: logout
                    }
                ]
            }}
            trigger={['click']}
        >
            <Tooltip title={user?.email || ''}>
                <Avatar
                    className={`${styles.avatar} ${className}`}
                    src={<FaRegUser color='#ffffff' />}
                    alt='User'
                    size='large'
                    shape='square'
                    onClick={e => e?.preventDefault()}
                />
            </Tooltip>
        </Dropdown>
    )
}
