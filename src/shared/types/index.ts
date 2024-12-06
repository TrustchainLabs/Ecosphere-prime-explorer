export type Coordinates = [number, number]

export type Geometry = {
    type: 'Point',
    coordinates: Coordinates
}

export type Feature = {
    type: 'Feaure',
    properties: object,
    geometry: Geometry
}

export type FeatureCollection = {
    type: 'FeatureCollection',
    features: Feature[]
}
