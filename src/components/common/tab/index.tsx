import { TabName } from '../../../shared/enums'
import styles from './Tab.module.css'

type TabProps = {
    name: TabName,
    src: string,
    alt: string,
    active: boolean,
    onClick: (tab: TabName) => void
}

export const Tab = ({ name, src, alt, active, onClick }: TabProps) => {
    return (
        <div
            className={`${styles.container} ${ active ? styles.active : '' }`}
            onClick={() => onClick(name)}
        >
            <img
                className={styles.icon}
                src={src}
                alt={alt}
            />
        </div>
    )
}
