export default function CityDetails({ data }) {
  console.log(process.env.WEATHER_API_KEY)
  console.log(data)
  return (
    <div>
      <dl>
        <dt className="font-bold">Population</dt>
        <dd>{data.city?.population}</dd>
        <dt className="font-bold">Latitude</dt>
        <dd>{data.city?.coord?.lat}</dd>
        <dt className="font-bold">Longitude</dt>
        <dd>{data.city?.coord?.lon}</dd>
        <dt className="font-bold">Sunrise</dt>
        <dd>{new Date(data.city?.sunrise * 1000).toLocaleTimeString()}</dd>
        <dt className="font-bold">Sunset</dt>
        <dd>{new Date(data.city?.sunset * 1000).toLocaleTimeString()}</dd>
      </dl>
    </div>
  )
}
