import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { useState } from 'react'

export default function About({ text }) {
  let [clicked, setClicked] = useState(false)
  return (
    <div className="fixed z-10 text-4xl bottom-10 right-5">
      <button
        className="relative text-slate-600"
        onClick={(e) => setClicked(!clicked)}
      >
        <AiOutlineQuestionCircle
          className={clicked ? 'text-red-600' : 'text-slate-600'}
        />
      </button>
      {clicked && (
        <div className="absolute w-32 text-sm border-2 bottom-10 right-10">
          {text}
        </div>
      )}
    </div>
  )
}
