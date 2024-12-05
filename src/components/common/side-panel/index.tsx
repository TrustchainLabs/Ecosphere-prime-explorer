'use client'
import { useState } from 'react'
import { FaAngleLeft } from 'react-icons/fa6'
import styles from './SidePanel.module.css'

type SidePanelProps = {
    position?: 'left' | 'right'
}

export const SidePanel = ({ position = 'left' }: SidePanelProps) => {
    const [isOpen, setIsOpen] = useState(true)

    const togglePanelView = () => {
        setIsOpen(prevIsOpen => !prevIsOpen)
    }

    return (
        <div
            className={`${ styles.container } ${ position === 'right' ? styles.containerRight : styles.containerLeft }`}
        >
            <div className={`${ styles.panel } ${ isOpen ? styles.panelOpen : styles.panelClose }`}>
            </div>
            <FaAngleLeft
                className={`
                    ${ styles.navIcon }
                    ${ (!isOpen && position === 'left') || (isOpen && position === 'right')
                        ? styles.navIconRight
                        : styles.navIconLeft
                    }
                `}
                onClick={togglePanelView}
            />
        </div>
    )
}
