import { GeometryType } from '../enums'

export type Coordinates = [number, number, number]

export type Geometry = {
    type: GeometryType.POINT,
    coordinates: Coordinates
}

export type Feature = {
    type: 'Feature',
    properties: { [key: string]: any },
    geometry: Geometry
}

export type FeatureCollection = {
    type: 'FeatureCollection',
    features: Feature[]
}
