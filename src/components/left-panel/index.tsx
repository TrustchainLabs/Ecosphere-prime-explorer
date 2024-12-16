'use client'
import { useState } from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { FaArrowRightLong, FaRegCalendar } from 'react-icons/fa6'
import { SidePanel } from '../common/side-panel'
import { LeftPanelContent } from '../left-panel-content'
import { Feature } from '../../shared/types'
import { TabName } from '../../shared/enums'
import styles from './LeftPanel.module.css'

type LeftPanelProps = {
    selectedNode?: Feature,
    selectedTab: TabName
}

export const LeftPanel = ({ selectedNode, selectedTab }: LeftPanelProps) => {
    const [dateRange, setDateRange] = useState([dayjs().subtract(7, 'days'), dayjs()])

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
                {
                    selectedTab !== TabName.ADD_DEVICE &&
                    <>
                        <div className={styles.title}>
                            { selectedNode?.properties?.serial &&
                                <>
                                    <div className={styles.titleKey}>Node</div>
                                    <div className={styles.titleValue}>
                                        {`N-${selectedNode?.properties?.serial}`}
                                    </div>
                                </>
                            }
                        </div>
                        <DatePicker.RangePicker
                            separator={<FaArrowRightLong className={styles.separator} />}
                            suffixIcon={<FaRegCalendar className={styles.suffixIcon} />}
                            minDate={dayjs().subtract(2, 'months')}
                            maxDate={dayjs()}
                            value={dateRange as any}
                            onChange={onDateRangeChange}
                        />
                    </>
                }
            </div>
            <LeftPanelContent
                selectedNode={selectedNode}
                dateRange={dateRange as any}
                selectedTab={selectedTab}
            />
        </SidePanel>
    )
}
