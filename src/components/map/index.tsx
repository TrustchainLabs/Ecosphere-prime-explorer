'use client'
import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { MAPBOX_ACCESS_TOKEN } from '../../shared/constants'
import styles from './Map.module.css'

export const Map = () => {
    const mapRef: any = useRef(null)

    useEffect(() => {
        mapRef.current = new mapboxgl.Map({
            container: 'map',
            accessToken: MAPBOX_ACCESS_TOKEN,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [101.70977605792783, 3.157292964783922],
            zoom: 6
        })
    }, [])

    return (
        <div id='map' className={styles.container} />
    )
}
