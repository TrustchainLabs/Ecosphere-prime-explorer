import { FeatureCollection, Feature } from '../../shared/types'

export const convertToPointGeoJson = (data: { [key: string]: any }[]): FeatureCollection => {
    const locationKeys = ['location', 'longitude', 'latitude', 'altitude']
    return {
        type: 'FeatureCollection',
        features: data.map(d => {
            const properties = Object.keys(d).reduce((prop: { [key: string]: any }, k: string) => {
                if (!locationKeys.includes(k)) {
                    prop[k] = d[k]
                }
                return prop
            }, {})

            return {
                type: 'Feature',
                properties,
                geometry: d.location || {
                    type: 'Point',
                    coordinates: [d.longitude, d.latitude, d.altitude || 0]
                }
            } as Feature
        })
    }
}
