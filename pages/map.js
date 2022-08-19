import { Map, Marker } from 'pigeon-maps'
import { useEffect, useState } from 'react'
import Table from '../components/Table'

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
      <h1>Weather by Coordinates</h1>
      <Map
        height={300}
        defaultCenter={coord}
        defaultZoom={10}
        onClick={(e) => setCoord(e.latLng)}
      >
        <Marker width={25} anchor={coord} />
      </Map>
      {!!Object.keys(data).length && <Table data={data} />}
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
