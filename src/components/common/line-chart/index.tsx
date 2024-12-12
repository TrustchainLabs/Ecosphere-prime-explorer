import { LineChart as Chart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import styles from './LineChart.module.css'

type LineChartProps = {
    data: { [key: string]: string | number }[],
    title: string,
    xKey: string,
    yKey: string,
    legends: { [key: string]: string }
}

export const LineChart = ({ data, title, xKey, yKey, legends }: LineChartProps) => {
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
                    <CartesianGrid
                        stroke='var(--border-color)'
                        strokeDasharray='0'
                        vertical={false}
                    />
                    <XAxis
                        dataKey={xKey}
                        tickLine={false}
                        axisLine={false}
                        allowDataOverflow={true}
                        tickMargin={12}
                        tick={{
                            fontSize: '12px'
                        }}
                    />
                    <YAxis
                        dataKey={yKey}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={12}
                        tick={{
                            fontSize: '12px'
                        }}
                    />
                    <Tooltip
                        wrapperClassName={styles.tooltip}
                    />
                    <Legend
                        wrapperStyle={{
                            top: '180px'
                        }}
                        formatter={value => legends[value] || value}
                    />
                    <Line
                        type='monotone'
                        dataKey={yKey}
                        stroke='var(--primary-color)'
                    />
                </Chart>
            </ResponsiveContainer>
        </div>
    )
}
