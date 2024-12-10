import { LineChart as Chart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import styles from './LineChart.module.css'

type LineChartProps = {
    data: { [key: string]: string | number }[],
    title: string,
    xKey: string,
    yKey: string
}

export const LineChart = ({ data, title, xKey, yKey }: LineChartProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.chartTitle}>
                {title}
            </div>
            <ResponsiveContainer className={styles.chartContainer}>
                <Chart
                    data={data}
                    margin={{
                        top: 8,
                        right: 32,
                        left: -16,
                        bottom: 4
                    }}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip
                        wrapperClassName={styles.tooltip}
                    />
                    <Legend />
                    <Line type='monotone' dataKey={yKey} stroke='var(--primary-color)' />
                </Chart>
            </ResponsiveContainer>
        </div>
    )
}
