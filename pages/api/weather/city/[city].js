import { fetchWeather } from '../../../../fetchWeather'

export default async function handler(req, res) {
  let { city } = req.query
  res.json(await fetchWeather(city))
}
