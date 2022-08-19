import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Breadcrumb() {
  let router = useRouter()
  let paths = router.asPath.split`/`

  return (
    <nav className="mb-5" aria-label="breadcrumb">
      <ol className="list-chevron flex list-outside font-semibold">
        {paths.map((path, i) => {
          return !i ? null : i === paths.length - 1 ? (
            <li key={i} className="capitalize">
              {path}
            </li>
          ) : (
            <Link key={i} href={paths.slice(0, i + 1).join`/`}>
              <a>
                <li
                  className={`capitalize after:content-['>'] after:mx-2 text-blue-700 hover:text-blue-900 after:text-black`}
                >
                  {path}
                </li>
              </a>
            </Link>
          )
        })}
      </ol>
    </nav>
  )
}
