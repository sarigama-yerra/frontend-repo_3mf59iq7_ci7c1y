import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../lib/api'
import ImageGallery from '../components/ImageGallery'

export default function ProductDetail({ onAdd }){
  const { id } = useParams()
  const [p, setP] = useState(null)
  const [selected, setSelected] = useState({ size: null, color: null })

  useEffect(() => {
    (async () => {
      const data = await apiGet(`/api/products/${id}`)
      setP(data)
    })()
  }, [id])

  if (!p) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-slate-300">Loading...</div>

  const addToCart = () => {
    const item = { ...p, size: selected.size || p.sizes?.[0], color: selected.color || p.colors?.[0] }
    onAdd(item)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <ImageGallery images={p.images || []} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">{p.title}</h1>
          <p className="text-slate-300 mt-2">{p.description}</p>
          <div className="text-2xl text-white font-extrabold mt-4">₹{p.price}</div>

          <div className="mt-6">
            <div className="text-slate-300 text-sm mb-2">Select Size</div>
            <div className="flex flex-wrap gap-2">
              {p.sizes?.map(s => (
                <button key={s} onClick={()=>setSelected({...selected, size:s})} className={`px-3 py-2 rounded-lg border ${selected.size===s? 'bg-white text-black':'bg-transparent text-slate-200'} border-white/20`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-slate-300 text-sm mb-2">Select Color</div>
            <div className="flex flex-wrap gap-2">
              {p.colors?.map(c => (
                <button key={c} onClick={()=>setSelected({...selected, color:c})} className={`px-3 py-2 rounded-lg border ${selected.color===c? 'bg-white text-black':'bg-transparent text-slate-200'} border-white/20`}>{c}</button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button onClick={addToCart} className="px-5 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600">Add to Cart</button>
            <a href="#upi" className="px-5 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600">Buy Now via UPI</a>
          </div>

          <div id="upi" className="mt-6 text-slate-300 text-sm">
            <p>UPI supported: PhonePe, Paytm, Google Pay. Final payment is completed on the checkout page.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
