'use client'
import React, { useState } from 'react'
import { FaAngleLeft } from 'react-icons/fa6'
import styles from './SidePanel.module.css'

type SidePanelProps = {
    className?: string,
    position?: 'left' | 'right',
    style?: { [key: string]: string },
    children?: React.ReactNode
}

export const SidePanel = ({ className = '', position = 'left', style, children }: SidePanelProps) => {
    const [isOpen, setIsOpen] = useState(true)

    const togglePanelView = () => {
        setIsOpen(prevIsOpen => !prevIsOpen)
    }

    return (
        <div
            className={`${ styles.container } ${ position === 'right' ? styles.containerRight : styles.containerLeft }`}
            style={style}
        >
            <div className={`${ styles.panel } ${ isOpen ? styles.panelOpen : styles.panelClose } ${ className }`}>
                {children}
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
