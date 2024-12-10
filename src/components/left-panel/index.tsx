'use client'
import { useState } from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { FaArrowRightLong, FaRegCalendar } from 'react-icons/fa6'
import { SidePanel } from '../common/side-panel'
import { LeftPanelContent } from '../left-panel-content'
import styles from './LeftPanel.module.css'

export const LeftPanel = () => {
    const [dateRange, setDateRange] = useState([dayjs(), dayjs()])

    const onDateRangeChange = (dateRange: any) => {
        setDateRange(dateRange)
    }

    return (
        <SidePanel
            className={styles.panel}
            position='left'
            style={{ left: '110px' }}
        >
            <div className={styles.top}>
                <div className={styles.title}>
                    <div className={styles.titleKey}>NODE</div>
                    <div className={styles.titleValue}>11.11.11</div>
                </div>
                <DatePicker.RangePicker
                    separator={<FaArrowRightLong className={styles.separator} />}
                    suffixIcon={<FaRegCalendar className={styles.suffixIcon} />}
                    minDate={dayjs().subtract(2, 'months')}
                    maxDate={dayjs()}
                    value={dateRange as any}
                    onChange={onDateRangeChange}
                />
            </div>
            <LeftPanelContent />
        </SidePanel>
    )
}
