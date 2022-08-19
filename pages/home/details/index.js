import Breadcrumb from '../../../components/Breadcrumb'
import About from '../../../components/About'

export default function details() {
  return (
    <div id="homeContent" className="container p-8 px-6 mx-auto mt-5">
      <Breadcrumb />
      <h1 className="mb-4 text-4xl capitalize">Next Forecast - Details</h1>
      <About text="Using ISR (getStaticProps with revalidate key)" />
    </div>
  )
}

export async function getStaticProps(context) {
  let { locale } = context
  const langToggleLink = locale === 'en' ? '/fr/details/' : '/details/'

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: `Next Forecast - details`,
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: `Next Forecast - details`,
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: { locale, langToggleLink, meta },
  }
}
