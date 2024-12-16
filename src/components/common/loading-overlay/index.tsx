import { Spin } from 'antd'
import styles from './LoadingOverlay.module.css'

export const LoadingOverlay = () => {
    return (
        <div className={styles.container}>
            <Spin size='large' />
        </div>
    )
}
