import { LeftPanel } from '../left-panel'
import { RightPanel } from '../right-panel'
import styles from './HomePage.module.css'

export const HomePage = () => {
    return (
        <div className={styles.container}>
            <LeftPanel />
            <RightPanel />
        </div>
    )
}
