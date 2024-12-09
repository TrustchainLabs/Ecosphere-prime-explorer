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
        // Create Popup
        const popup = createPopup(feature)

        // Create Marker
        const markerEl = document.createElement('img')
        markerEl.src ='/icons/cloud-marker.svg'
        markerEl.alt = 'Marker'
        markerEl.setAttribute('width', '80px')

        return new mapboxgl.Marker(markerEl, { offset: [0, -56] })
            .setLngLat(feature?.geometry.coordinates as any)
            .setPopup(popup)
    }

    const createPopup = (feature?: Feature) => {
        return new mapboxgl.Popup({ closeButton: false })
            .setHTML(`
                <div class='${styles.popupContent}'>
                    <img
                        src='/icons/cloud.svg'
                        alt='Node'
                        width='36px'
                    />
                    <div class='${styles.node}'>
                        <div>Node: </div>
                        <div>11.11.11</div>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td class='${styles.popupContentKeyIcon}'><img src='/icons/water-droplet.svg' alt='Water Droplet' width='16px' /></td>
                                <td class='${styles.popupContentKey}'>Precipitation</td>
                                <td class='${styles.popupContentValue}'>26.14 cm</td>
                            </tr>
                            <tr>
                                <td class='${styles.popupContentKeyIcon}'><img src='/icons/sun.svg' alt='Sun' width='16px' /></td>
                                <td class='${styles.popupContentKey}'>UV</td>
                                <td class='${styles.popupContentValue}'>5.87 pK</td>
                            </tr>
                            <tr>
                                <td class='${styles.popupContentKeyIcon}'><img src='/icons/wind.svg' alt='Wind' width='16px' /></td>
                                <td class='${styles.popupContentKey}'>Windspeed</td>
                                <td class='${styles.popupContentValue}'>10.5 m/s</td>
                            </tr>
                            <tr>
                                <td class='${styles.popupContentKeyIcon}'><img src='/icons/compass.svg' alt='Compass' width='16px' /></td>
                                <td class='${styles.popupContentKey}'>Wind Direction</td>
                                <td class='${styles.popupContentValue}'>90 W</td>
                            </tr>
                            <tr>
                                <td class='${styles.popupContentKeyIcon}'><img src='/icons/gauge.svg' alt='Gauge' width='16px' /></td>
                                <td class='${styles.popupContentKey}'>Atm Pressure</td>
                                <td class='${styles.popupContentValue}'>26.14 Bar</td>
                            </tr>
                            <tr>
                                <td class='${styles.popupContentKeyIcon}'><img src='/icons/airwave.svg' alt='Air Wave' width='16px' /></td>
                                <td class='${styles.popupContentKey}'>Air Quality</td>
                                <td class='${styles.popupContentValue}'>2.5 PM</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `)
    }

    return (
        <div id='map' className={styles.container} />
    )
}
