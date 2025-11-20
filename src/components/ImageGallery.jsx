import { useRef, useState } from 'react'

export default function ImageGallery({ images = [] }) {
  const [index, setIndex] = useState(0)
  const startX = useRef(null)

  const onMouseDown = (e) => { startX.current = e.clientX }
  const onMouseUp = () => { startX.current = null }
  const onMouseMove = (e) => {
    if (startX.current == null) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 25) {
      const dir = dx > 0 ? -1 : 1
      setIndex((prev) => (prev + dir + images.length) % images.length)
      startX.current = e.clientX
    }
  }

  return (
    <div>
      <div
        className="aspect-square bg-slate-900 rounded-2xl overflow-hidden select-none"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        role="img"
        aria-label="Product gallery"
      >
        {images[index] ? (
          <img src={images[index]} alt="Product" className="w-full h-full object-cover transition-all duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-6 gap-2">
          {images.map((src, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`aspect-square rounded-lg overflow-hidden border ${i===index ? 'border-blue-400' : 'border-white/10'}`}>
              <img src={src} alt="thumb" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <p className="text-slate-400 text-xs mt-2">Tip: drag left/right on the main image to rotate through angles.</p>
    </div>
  )
}
