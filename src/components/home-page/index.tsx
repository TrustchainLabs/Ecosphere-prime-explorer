'use client'
import { useState, useEffect } from 'react'
import { LeftNav } from '../left-nav'
import { LeftPanel } from '../left-panel'
import { Map } from '../map'
import { LoadingOverlay } from '../common/loading-overlay'
import { NodesAPI } from '../../shared/services/nodes'
import { FeatureCollection, Feature } from '../../shared/types'
import { TabName } from '../../shared/enums'
import { convertToPointGeoJson } from '../../shared/helpers'
import { usePrivateRoute } from '../../shared/hooks/use-private-route'
import styles from './HomePage.module.css'

export const HomePage = () => {
    const [isLoggedIn] = usePrivateRoute()
    const [nodeData, setNodeData] = useState<FeatureCollection>()
    const [selectedNode, setSelectedNode] = useState<Feature>()
    const [selectedTab, setSelectedTab] = useState<TabName>(TabName.TEMPERATURE)

    useEffect(() => {
        getNodeData()
    }, [])

    const getNodeData = async () => {
        const nodeData = await NodesAPI.getNodes({ includeLatestMeasurement: true })
        const nodeDataGeoJson = convertToPointGeoJson(nodeData)
        setNodeData(nodeDataGeoJson)
    }

    const onMarkerSelect = (feature?: Feature) => {
        setSelectedNode(feature)
    }

    const onTabSelect = (tab: TabName) => {
        setSelectedTab(tab)
    }

    if (!isLoggedIn) {
        return (
            <LoadingOverlay />
        )
    }

    return (
        <div className={styles.container}>
            <LeftNav
                selectedTab={selectedTab}
                onTabSelect={onTabSelect}
            />
            <LeftPanel
                selectedNode={selectedNode}
                selectedTab={selectedTab}
            />
            <Map
                markerGeojson={nodeData}
                onMarkerSelect={onMarkerSelect}
            />
        </div>
    )
}
