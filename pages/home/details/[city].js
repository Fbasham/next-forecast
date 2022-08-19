import Table from '../../../components/Table'
import Atlas from '../../../components/Atlas'
import { fetchWeather } from '../../../fetchWeather'
import About from '../../../components/About'
import CityDetails from '../../../components/CityDetails'
import Breadcrumb from '../../../components/Breadcrumb'

export default function city({ data, city }) {
  return (
    <div id="homeContent" className="container p-8 px-6 mx-auto mt-5">
      <Breadcrumb />
      <h1 className="mb-4 text-4xl capitalize">
        Next Forecast - {city} weather
      </h1>
      <div className="md:flex gap-5 mt-10">
        <Table data={data} />
        <div className="flex flex-col gap-5 grow">
          <Atlas coord={data.city.coord} />
          <CityDetails data={data} />
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
