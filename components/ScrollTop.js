import { useEffect, useState } from 'react'
import smoothscroll from 'smoothscroll-polyfill'

const ScrollTop = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    smoothscroll.polyfill()
    const handleWindowScroll = () => {
      if (window.scrollY > 200) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      aria-label="Scroll To Top"
      type="button"
      onClick={handleClick}
      style={{ opacity: show ? 1 : 0 }}
      className="fixed hidden p-2 text-gray-100 transition-opacity bg-gray-800 rounded-md md:inline-block right-8 bottom-8 hover:bg-gray-700"
    >
      <svg
        className="w-[22px] h-[22px]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}

export default ScrollTop
