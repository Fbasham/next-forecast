import { Map, Marker } from 'pigeon-maps'
import { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import CityDetails from '../components/CityDetails'
import Table from '../components/Table'
import About from '../components/About'

export default function map() {
  let [coord, setCoord] = useState([42.9746, -82.4066])
  let [data, setData] = useState({})

  useEffect(() => {
    async function getData() {
      let data = await (
        await fetch(`/api/weather/coord/${JSON.stringify(coord)}`)
      ).json()
      setData(data)
    }
    getData()
  }, [coord])

  return (
    <div className="container p-8 px-6 mx-auto mt-5">
      <Breadcrumb />
      <h1 className="mb-4 text-4xl">Weather by Coordinates</h1>
      <Map
        height={300}
        defaultCenter={coord}
        defaultZoom={10}
        onClick={(e) => setCoord(e.latLng)}
      >
        <Marker width={25} anchor={coord} />
      </Map>
      <div className="flex gap-10 mt-5">
        {!!Object.keys(data).length && <Table data={data} />}
        {!!Object.keys(data).length && <CityDetails data={data} />}
      </div>
      <About
        text={'Using client side rendering and api route with private API key'}
      />
    </div>
  )
}

export async function getStaticProps(context) {
  let { locale } = context
  const langToggleLink = locale === 'en' ? '/fr/map' : '/map'

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: `Next Forecast - location picker`,
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: `Next Forecast - location picker`,
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: { locale, langToggleLink, meta },
  }
}
