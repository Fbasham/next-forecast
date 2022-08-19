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
        <AiOutlineQuestionCircle className="hover:text-slate-800" />
      </button>
      {clicked && (
        <div className="absolute min-w-[200px] text-sm border-2 bg-slate-500 bg-opacity-25 bottom-9 right-9 p-1">
          {text}
        </div>
      )}
    </div>
  )
}
