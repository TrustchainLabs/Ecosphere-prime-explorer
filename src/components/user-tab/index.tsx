import { useRouter } from 'next/navigation'
import { Dropdown, Avatar } from 'antd'
import { FaRegUser } from 'react-icons/fa6'
import { AuthAPI } from '../../shared/services/auth'
import styles from './UserTab.module.css'

type UserTabProps = {
    className?: string
}

export const UserTab = ({ className = '' }: UserTabProps) => {
    const router = useRouter()

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
            <Avatar
                className={`${styles.avatar} ${className}`}
                src={<FaRegUser color='#ffffff' />}
                alt='User'
                size='large'
                shape='square'
                onClick={e => e?.preventDefault()}
            />
        </Dropdown>
    )
}
