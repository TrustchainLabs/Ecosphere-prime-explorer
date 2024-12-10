import styles from './Tab.module.css'

type TabProps = {
    src: string,
    alt: string,
    active: boolean
}

export const Tab = ({ src, alt, active }: TabProps) => {
    return (
        <div className={`${styles.container} ${ active ? styles.active : '' }`}>
            <img
                className={styles.icon}
                src={src}
                alt={alt}
            />
        </div>
    )
}
