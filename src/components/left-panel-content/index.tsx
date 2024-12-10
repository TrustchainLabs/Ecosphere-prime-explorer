import styles from './LeftPanelContent.module.css'

export const LeftPanelContent = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <img
                    src='/icons/thermostat.svg'
                    alt='Thermostat'
                    width={10}
                />
                <div className={styles.title}>TEMPERATURE</div>
            </div>
        </div>
    )
}
