import Table from '../../components/Table'
import Atlas from '../../components/Atlas'
import { fetchWeather } from '../../fetchWeather'
import About from '../../components/About'

export default function city({ data, city }) {
  return (
    <div id="homeContent" className="container p-8 px-6 mx-auto mt-5">
      <h1 className="mb-4 text-4xl capitalize">
        Next Forecast - {city} weather
      </h1>
      <div className="flex gap-5 mt-10">
        <Table data={data} />
        <div className="flex flex-col gap-5 grow">
          <Atlas coord={data.city.coord} />
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
      <About text="Using ISR (getStaticProps with revalidate key)" />
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
  const langToggleLink =
    locale === 'en' ? '/fr/details/' + city : '/details/' + city

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
