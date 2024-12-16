import { Tooltip } from 'antd'
import { TabName } from '../../../shared/enums'
import styles from './Tab.module.css'

type TabProps = {
    className?: string
    name: TabName
    tooltip?: string
    src: string
    alt: string
    active: boolean
    onClick: (tab: TabName) => void
}

export const Tab = ({ className = '', name, tooltip, src, alt, active, onClick }: TabProps) => {
    return (
        <Tooltip title={tooltip}>
            <div
                className={`${styles.container} ${ active ? styles.active : '' } ${className}`}
                onClick={() => onClick(name)}
            >
                <img
                    className={styles.icon}
                    src={src}
                    alt={alt}
                />
            </div>
        </Tooltip>
    )
}
