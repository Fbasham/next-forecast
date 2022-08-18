import Table from '../components/Table'
import Atlas from '../components/Atlas'
import fetchWeather from '../fetchWeather'

export default function city({ data }) {
  return (
    <div id="homeContent" className="container p-8 px-6 mx-auto mt-5">
      <h1 className="mb-4 text-4xl">Next Forecast</h1>
      <div className="flex gap-5 mt-10">
        <Table data={data} />
        <Atlas data={data} />
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
      title: `Next Forecast - ${city} Weather`,
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: `Next Forecast - ${city} Weather`,
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: { locale, langToggleLink, meta, data },
    revalidate: 10800,
  }
}
