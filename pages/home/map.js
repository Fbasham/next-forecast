import { Map as Mapp, Marker } from 'pigeon-maps'
import { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CityDetails from '../../components/CityDetails'
import Table from '../../components/Table'
import About from '../../components/About'

export default function Map() {
  let [coord, setCoord] = useState([42.9746, -82.4066])
  let [lat, setLat] = useState(coord[0])
  let [lon, setLon] = useState(coord[1])
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
      <div>
        <Mapp
          height={300}
          center={[lat, lon]}
          defaultZoom={10}
          onClick={(e) => {
            setCoord(e.latLng)
            setLat(e.latLng[0])
            setLon(e.latLng[1])
          }}
        >
          <Marker width={25} anchor={[lat, lon]} />
        </Mapp>
        <div className="flex flex-col md:flex-row md:justify-center md:items-center">
          <label htmlFor="lat" className="font-semibold mr-2">
            Set Latitude
          </label>
          <input
            type="number"
            step=".01"
            id="lat"
            name="lat"
            value={lat}
            onChange={(e) => setLat(+e.target.value)}
            className="border-2 rounded-md py-1 px-2 md:mr-2"
          ></input>
          <label htmlFor="lon" className="font-semibold mr-2">
            Set Longitude
          </label>
          <input
            type="number"
            step=".01"
            id="lon"
            name="lon"
            value={lon}
            onChange={(e) => setLon(+e.target.value)}
            className="border-2 rounded-md py-1 px-2 md:mr-2"
          ></input>
          <button
            onClick={(e) => setCoord([lat, lon])}
            className="rounded-md bg-slate-600 hover:bg-slate-800 py-1 text-white px-2"
          >
            Fetch Weather
          </button>
        </div>
      </div>
      <div className="md:flex gap-10 mt-5">
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
  const langToggleLink = locale === 'en' ? '/fr/home/map' : '/home/map'

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
