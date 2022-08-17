export default async function handler(req, res) {
  try {
    let { city } = req.query
    let { lat, lon } = (
      await (
        await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`
        )
      ).json()
    )[0]
    let data = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`
      )
    ).json()
    return res.json(data)
  } catch (e) {
    res.json([])
  }
}
