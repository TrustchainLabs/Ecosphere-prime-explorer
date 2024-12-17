import Image from 'next/image'
import { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { AddDevice } from '../add-device'
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

const tabIcon: { [key: string]: string } = {
    [TabName.TEMPERATURE]: 'thermostat',
    [TabName.ATM_PRESSURE]: 'gauge',
    [TabName.WIND_SPEED]: 'wind',
    [TabName.WIND_DIRECTION]: 'compass',
    [TabName.AIR_QUALITY]: 'airwave',
    [TabName.ADD_DEVICE]: 'plus'
}

const tabTitle: { [key: string]: string } = {
    [TabName.TEMPERATURE]: 'Temperature',
    [TabName.ATM_PRESSURE]: 'Atm Pressure',
    [TabName.WIND_SPEED]: 'Wind Speed',
    [TabName.WIND_DIRECTION]: 'Wind Direction',
    [TabName.AIR_QUALITY]: 'Air Quality',
    [TabName.ADD_DEVICE]: 'Add Device'
}

const chartTitle: { [key: string]: string } = {
    [TabName.TEMPERATURE]: 'Avg Temperature',
    [TabName.ATM_PRESSURE]: 'Avg Atm Pressure',
    [TabName.WIND_SPEED]: 'Avg Wind Speed',
    [TabName.WIND_DIRECTION]: 'Avg Wind Direction',
    [TabName.AIR_QUALITY]: 'Avg Air Quality'
}

const yKey: { [key: string]: string } = {
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
                <Image
                    src={`/icons/${tabIcon[selectedTab]}.svg`}
                    alt={tabIcon[selectedTab]}
                    width={18}
                />
                <div className={styles.title}>
                    { tabTitle[selectedTab] }
                </div>
            </div>
            {
                selectedTab === TabName.ADD_DEVICE ?
                <AddDevice /> :
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
            }
        </div>
    )
}
