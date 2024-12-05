import { LeftPanel } from '../left-panel'
import { RightPanel } from '../right-panel'
import { Map } from '../map'
import styles from './HomePage.module.css'

export const HomePage = () => {
    return (
        <div className={styles.container}>
            <LeftPanel />
            <Map />
            <RightPanel />
        </div>
    )
}
