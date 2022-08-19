import { Map, Marker } from 'pigeon-maps'

export default function Atlas({ coord }) {
  coord = Object.values(coord)
  return (
    <Map height={300} defaultCenter={coord} defaultZoom={10}>
      <Marker width={25} anchor={coord} />
    </Map>
  )
}
