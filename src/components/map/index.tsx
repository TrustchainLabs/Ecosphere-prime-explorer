import { CustomMap } from '../common/custom-map'

export const Map = () => {
    return (
        <CustomMap
            initialViewState={{
                longitude: 101.70977605792783,
                latitude: 3.157292964783922,
                zoom: 6
            }}
            minMapSize={{
                width: 600,
                height: 600
            }}
            mapStyle='https://demotiles.maplibre.org/style.json'
        />
    )
}
