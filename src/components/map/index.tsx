'use client'
import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { FeatureCollection, Feature } from '../../shared/types'
import { MAPBOX_ACCESS_TOKEN } from '../../shared/constants'
import styles from './Map.module.css'

type MapProps = {
    markerGeojson?: FeatureCollection
}

export const Map = ({ markerGeojson }: MapProps) => {
    const mapRef: any = useRef(null)
    const markersRef: any = useRef([])

    useEffect(() => {
        mapRef.current = new mapboxgl.Map({
            container: 'map',
            accessToken: MAPBOX_ACCESS_TOKEN,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [101.70977605792783, 3.157292964783922],
            zoom: 6
        })
    }, [])

    useEffect(() => {
        addMarkers(markerGeojson)

        return () => {
            removeMarkers()
        }
    }, [markerGeojson])

    const removeMarkers = () => {
        markersRef.current.forEach((marker: any) => {
            marker.remove()
        })
        markersRef.current = []
    }

    const addMarkers = (featureCollection?: FeatureCollection) => {
        featureCollection?.features.forEach(feature => {
            const marker = createMarker(feature)
            marker.addTo(mapRef.current)
            markersRef.current.push(marker)
        })
    }

    const createMarker = (feature?: Feature) => {
        const markerEl = document.createElement('img')
        markerEl.src ='/icons/cloud.svg'
        markerEl.alt = 'Marker'
        markerEl.setAttribute('width', '80px')
        return new mapboxgl.Marker(markerEl).setLngLat(feature?.geometry.coordinates as any)
    }

    return (
        <div id='map' className={styles.container} />
    )
}
