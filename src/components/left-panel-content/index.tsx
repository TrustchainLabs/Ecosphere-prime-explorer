import { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { LineChart } from '../common/line-chart'
import { Feature } from '../../shared/types'
import { MeasurementsAPI } from '../../shared/services/measurements'
import { TabName } from '../../shared/enums'
import styles from './LeftPanelContent.module.css'

dayjs.extend(utc)
dayjs.extend(timezone)

type LeftPanelContentProps = {
    selectedNode?: Feature,
    dateRange: [Dayjs, Dayjs],
    selectedTab: TabName
}

const tabTitle = {
    [TabName.TEMPERATURE]: 'Temperature',
    [TabName.ATM_PRESSURE]: 'Atm Pressure',
    [TabName.WIND_SPEED]: 'Wind Speed',
    [TabName.WIND_DIRECTION]: 'Wind Direction',
    [TabName.AIR_QUALITY]: 'Air Quality'
}

const chartTitle = {
    [TabName.TEMPERATURE]: 'Avg Temperature',
    [TabName.ATM_PRESSURE]: 'Avg Atm Pressure',
    [TabName.WIND_SPEED]: 'Avg Wind Speed',
    [TabName.WIND_DIRECTION]: 'Avg Wind Direction',
    [TabName.AIR_QUALITY]: 'Avg Air Quality'
}

const yKey = {
    [TabName.TEMPERATURE]: 'averageTemperature',
    [TabName.ATM_PRESSURE]: 'averageAtmPressure',
    [TabName.WIND_SPEED]: 'averageWindSpeed',
    [TabName.WIND_DIRECTION]: 'averageWindDirection',
    [TabName.AIR_QUALITY]: 'averageAirQuality'
}

export const LeftPanelContent = ({ selectedNode, dateRange, selectedTab }: LeftPanelContentProps) => {
    const [measurements, setMeasurements] = useState([])

    useEffect(() => {
        getMeasurements()
    }, [selectedNode, dateRange])

    const getMeasurements = async () => {
        if (dateRange?.length !== 2) {
            return setMeasurements([])
        }
        const measurements = await MeasurementsAPI.getMeasurements({
            startDate: dateRange[0].toDate(),
            endDate: dateRange[1].toDate(),
            deviceId: selectedNode?.properties?.id,
            groupBy: 'day'

        })
        const updatedMeasurements = measurements.map((m: any) => ({
            ...m,
            day: dayjs.tz(m.date, dayjs.tz.guess()).format('D MMM')
        }))
        setMeasurements(updatedMeasurements)
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <img
                    src='/icons/thermostat.svg'
                    alt='Thermostat'
                    width={10}
                />
                <div className={styles.title}>
                    { tabTitle[selectedTab] }
                </div>
            </div>
            <div className={styles.chartContainer}>
                <LineChart
                    data={measurements}
                    title={chartTitle[selectedTab]}
                    xKey='day'
                    yKey={yKey[selectedTab]}
                    legends={{
                        [yKey[selectedTab]]: chartTitle[selectedTab]
                    }}
                />
            </div>
        </div>
    )
}
