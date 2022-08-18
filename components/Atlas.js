import { Map, Marker } from 'pigeon-maps'

export default function Atlas({ data }) {
  let coords = Object.values(data.city.coord)
  return (
    <Map height={300} defaultCenter={coords} defaultZoom={10}>
      <Marker width={25} anchor={coords} />
    </Map>
  )
}
