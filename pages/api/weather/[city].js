import fetchWeather from '../../../fetchWeather'

export default async function handler(req, res) {
  let { city } = req.query
  res.send(await fetchWeather(city))
}
