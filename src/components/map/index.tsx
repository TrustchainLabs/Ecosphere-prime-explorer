'use client'
import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FeatureCollection, Feature } from '../../shared/types'
import { MAPBOX_ACCESS_TOKEN } from '../../shared/constants'
import styles from './Map.module.css'

dayjs.extend(relativeTime)

type MapProps = {
    markerGeojson?: FeatureCollection,
    onMarkerSelect?: (feature?: Feature) => void
}

export const Map = ({ markerGeojson, onMarkerSelect }: MapProps) => {
    const mapRef: any = useRef(null)
    const markersRef: any = useRef([])

    useEffect(() => {
        mapRef.current = new mapboxgl.Map({
            container: 'map',
            accessToken: MAPBOX_ACCESS_TOKEN,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [101.31551054444253, 3.041923959239469],
            zoom: 10
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
        markerEl.onclick = () => onMarkerSelect?.(feature)

        return new mapboxgl.Marker(markerEl, { offset: [0, -56] })
            .setLngLat(feature?.geometry.coordinates as any)
            .setPopup(popup)
    }

    const getElapsedTimeFromLatestTransmission = (feature?: Feature) => {
        if (!feature?.properties?.latestMeasurement?.createdAt) {
            return 'N/A'
        }

        return dayjs(dayjs.tz(feature.properties.latestMeasurement.createdAt, dayjs.tz.guess())).toNow()
    }

    const createPopup = (feature?: Feature) => {
        return new mapboxgl.Popup({ closeButton: false })
            .setHTML(`
                <div class='${styles.popup}'>
                    <div class='${styles.popupHeader}'>
                        <img
                            src='/icons/cloud.svg'
                            alt='Node'
                            width='36px'
                        />
                        <div class='${styles.node}'>
                            <div>Node</div>
                            <div>|</div>
                            <div>
                                N-${feature?.properties?.serial}
                            </div>
                        </div>
                        <div class='${styles.metadata}'>
                            <div>
                                ${feature?.geometry?.coordinates?.join(', ') + 'm'}
                            </div>
                            <div>
                                ${getElapsedTimeFromLatestTransmission(feature)}
                            </div>
                        </div>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td class='${styles.popupContentKeyIcon}'>
                                    <img src='/icons/thermostat.svg' alt='Temperature' width='8px' />
                                </td>
                                <td class='${styles.popupContentKey}'>Temperature</td>
                                <td class='${styles.popupContentValue}'>
                                    ${feature?.properties?.latestMeasurement?.temperature?.value} ${feature?.properties?.latestMeasurement?.temperature?.unit}
                                </td>
                            </tr>
                            <tr>
                                <td class='${styles.popupContentKeyIcon}'>
                                    <img src='/icons/compass.svg' alt='Compass' width='16px' />
                                </td>
                                <td class='${styles.popupContentKey}'>Wind Direction</td>
                                <td class='${styles.popupContentValue}'>
                                    ${feature?.properties?.latestMeasurement?.windDirection?.value} ${feature?.properties?.latestMeasurement?.windDirection?.unit}
                                </td>
                            </tr>
                            <tr>
                                <td class='${styles.popupContentKeyIcon}'>
                                    <img src='/icons/wind.svg' alt='Wind' width='16px' />
                                </td>
                                <td class='${styles.popupContentKey}'>Wind Speed</td>
                                <td class='${styles.popupContentValue}'>
                                    ${feature?.properties?.latestMeasurement?.windSpeed?.value} ${feature?.properties?.latestMeasurement?.windSpeed?.unit}
                                </td>
                            </tr>
                            <tr>
                                <td class='${styles.popupContentKeyIcon}'>
                                    <img src='/icons/gauge.svg' alt='Gauge' width='16px' />
                                </td>
                                <td class='${styles.popupContentKey}'>Atm. Pressure</td>
                                <td class='${styles.popupContentValue}'>
                                    ${feature?.properties?.latestMeasurement?.atmPressure?.value} ${feature?.properties?.latestMeasurement?.atmPressure?.unit}
                                </td>
                            </tr>
                            <tr>
                                <td class='${styles.popupContentKeyIcon}'>
                                    <img src='/icons/airwave.svg' alt='Airwave' width='16px' /></td>
                                <td class='${styles.popupContentKey}'>Air Quality</td>
                                <td class='${styles.popupContentValue}'>
                                    ${feature?.properties?.latestMeasurement?.airQuality?.value} ${feature?.properties?.latestMeasurement?.airQuality?.unit}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `)
            .on('close', () => onMarkerSelect?.())
            .on('open', () => onMarkerSelect?.(feature))
    }

    return (
        <div id='map' className={styles.container} />
    )
}
