'use client'
import { useRef, useState, useEffect } from 'react'
import DeckGL from '@deck.gl/react'
import { Map as BaseMap } from 'react-map-gl/maplibre'
import styles from './Map.module.css'

export const Map = () => {
    const mapContainerRef: any = useRef(null)
    const [mapSize, setMapSize] = useState({ width: 600, height: 600 })

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleResize = () => {
        if (mapContainerRef.current) {
            setMapSize(prevMapSize => ({
                ...prevMapSize,
                width: mapContainerRef.current.offsetWidth,
                height: mapContainerRef.current.offsetHeight
            }))
        }
    }

    return (
        <div ref={mapContainerRef} className={styles.container}>
            <DeckGL
                initialViewState={{
                    longitude: 101.70977605792783,
                    latitude: 3.157292964783922,
                    zoom: 6
                }}
                controller={true}
                width={mapSize.width}
                height={mapSize.height}
            >
                <BaseMap
                    reuseMaps={true}
                    mapStyle='https://demotiles.maplibre.org/style.json'
                />
            </DeckGL>
        </div>
    )
}
