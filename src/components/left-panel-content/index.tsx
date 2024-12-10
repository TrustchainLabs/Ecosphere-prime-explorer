import { LineChart } from '../common/line-chart'
import styles from './LeftPanelContent.module.css'

const data = [
    {
        date: '1 Oct',
        temperature: 28
    },
    {
        date: '2 Oct',
        temperature: 27
    },
    {
        date: '3 Oct',
        temperature: 27
    },
    {
        date: '4 Oct',
        temperature: 30
    },
    {
        date: '5 Oct',
        temperature: 24
    },
    {
        date: '6 Oct',
        temperature: 28
    }
]

export const LeftPanelContent = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <img
                    src='/icons/thermostat.svg'
                    alt='Thermostat'
                    width={10}
                />
                <div className={styles.title}>Temperature</div>
            </div>
            <div className={styles.chartContainer}>
                <LineChart
                    data={data}
                    title='Daily Temperature'
                    xKey='date'
                    yKey='temperature'
                />
            </div>
        </div>
    )
}
