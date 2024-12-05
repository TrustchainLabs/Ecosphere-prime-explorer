'use client'
import { useRef, useState, useEffect } from 'react'
import DeckGL from '@deck.gl/react'
import { Map } from 'react-map-gl/maplibre'
import styles from './CustomMap.module.css'

type CustomMapProps = {
    initialViewState: {
        longitude: number,
        latitude: number,
        zoom: number
    },
    minMapSize: {
        width: number,
        height: number
    },
    mapStyle: string
}

export const CustomMap = ({ initialViewState, minMapSize, mapStyle }: CustomMapProps) => {
    const mapContainerRef: any = useRef(null)
    const [mapSize, setMapSize] = useState(minMapSize)

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
                initialViewState={initialViewState}
                controller={true}
                width={mapSize.width}
                height={mapSize.height}
            >
                <Map
                    reuseMaps={true}
                    mapStyle={mapStyle}
                />
            </DeckGL>
        </div>
    )
}
