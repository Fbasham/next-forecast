import { fetchWeatherByCoord } from '../../../../lib/fetchWeather'

export default async function handler(req, res) {
  let { coord } = req.query
  res.json(await fetchWeatherByCoord(...JSON.parse(coord)))
}
