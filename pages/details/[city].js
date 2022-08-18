import Table from '../../components/Table'
import Atlas from '../../components/Atlas'
import fetchWeather from '../../fetchWeather'

export default function city({ data, city }) {
  console.log(data)
  return (
    <div id="homeContent" className="container p-8 px-6 mx-auto mt-5">
      <h1 className="mb-4 text-4xl capitalize">
        Next Forecast - {city} weather
      </h1>
      <div className="flex gap-5 mt-10">
        <Table data={data} />
        <div className="flex flex-col gap-5 grow">
          <Atlas data={data} />
          <div>
            <dl>
              <dt className="font-bold">Population</dt>
              <dd>{data.city.population}</dd>
              <dt className="font-bold">Latitude</dt>
              <dd>{data.city.coord.lat}</dd>
              <dt className="font-bold">Longitude</dt>
              <dd>{data.city.coord.lon}</dd>
              <dt className="font-bold">Sunrise</dt>
              <dd>{new Date(data.city.sunrise * 1000).toLocaleTimeString()}</dd>
              <dt className="font-bold">Sunset</dt>
              <dd>{new Date(data.city.sunset * 1000).toLocaleTimeString()}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths(context) {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  let { city } = context.params

  let data = await fetchWeather(city)

  let { locale } = context
  const langToggleLink = locale === 'en' ? '/fr/test' : '/test'

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: `Next Forecast - ${city} weather`,
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: `Next Forecast - ${city} weather`,
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: { locale, langToggleLink, meta, data, city },
    revalidate: 10800,
  }
}
