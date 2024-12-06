'use client'
import { useState, useEffect } from 'react'
import { LeftPanel } from '../left-panel'
import { Map } from '../map'
import { NodesAPI } from '../../shared/services/nodes'
import { FeatureCollection } from '../../shared/types'
import styles from './HomePage.module.css'

export const HomePage = () => {
    const [nodeData, setNodeData] = useState<FeatureCollection>()

    useEffect(() => {
        getNodeData()
    }, [])

    const getNodeData = async () => {
        const nodeData = await NodesAPI.getNodes()
        setNodeData(nodeData)
    }

    return (
        <div className={styles.container}>
            <LeftPanel />
            <Map markerGeojson={nodeData} />
        </div>
    )
}
