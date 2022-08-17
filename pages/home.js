import PropTypes from 'prop-types'
import en from '../locales/en'
import fr from '../locales/fr'

import { fetchContent } from '../lib/cms'
import Table from '../components/Table'
import Spinner from '../components/Spinner'

import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home(props) {
  const router = useRouter()
  let [city, setCity] = useState('')
  let [data, setData] = useState({})
  let [isLoading, setIsLoadng] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!city) {
      setData({})
      return
    }
    await fetchWeather(city)
  }

  async function fetchWeather(city) {
    setData({})
    setIsLoadng(true)
    let data = await (await fetch(`/api/weather/${city}`)).json()
    setData(data)
    setIsLoadng(false)
  }

  /* istanbul ignore next */
  const t = props.locale === 'en' ? en : fr
  return (
    <div id="homeContent" className="container p-8 px-6 mx-auto mt-5">
      <h1 className="mb-4 text-2xl">Next Forecast</h1>
      <form className="flex flex-col gap-2 mb-5" onSubmit={handleSubmit}>
        <label htmlFor="search">Get weather by city</label>
        <input
          id="search"
          name="search"
          className="px-4 py-1 border-2 rounded-lg border-slate-700"
          onChange={(e) => setCity(e.target.value)}
        ></input>
      </form>
      {isLoading && <Spinner />}
      <div className="mt-5">
        {!!Object.keys(data).length && <Table data={data} />}
      </div>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  await fetchContent()

  let content = { data: [{ id: 1 }, { id: 2 }] }

  /* istanbul ignore next */
  const langToggleLink = locale === 'en' ? '/fr/home' : '/home'

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'Next Forecast - Home',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Next Forecast - Accueil',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: { locale, langToggleLink, content, meta },
  }
}

Home.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Meta Tags
   */
  meta: PropTypes.object,
}
