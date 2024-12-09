export type Coordinates = [number, number]

export type Geometry = {
    type: 'Point',
    coordinates: Coordinates
}

export type Feature = {
    type: 'Feaure',
    properties: { [key: string]: any },
    geometry: Geometry
}

export type FeatureCollection = {
    type: 'FeatureCollection',
    features: Feature[]
}
