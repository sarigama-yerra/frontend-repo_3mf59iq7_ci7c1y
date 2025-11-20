import { useState } from 'react'
import { apiPost } from '../lib/api'

export default function Checkout({ cart, onClear }){
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const [upiProvider, setUpiProvider] = useState('PhonePe')
  const [upiLink, setUpiLink] = useState('')
  const [status, setStatus] = useState('')

  const pay = async () => {
    const items = cart.map(i => ({
      product_id: i.id,
      title: i.title, brand: i.brand, price: i.price, size: i.size, color: i.color, quantity: i.quantity, thumbnail: i.images?.[0]
    }))
    const res = await apiPost('/api/orders', {
      items,
      subtotal,
      shipping: 0,
      total: subtotal,
      upi_provider: upiProvider,
      upi_id: 'premium@upi'
    })
    setUpiLink(res.upi_link)
    setStatus('Order created. Use your UPI app to complete the payment.')
    onClear()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-6">Checkout</h1>
      <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
        <div className="mb-4">
          <label className="block text-slate-300 mb-2">Choose UPI Provider</label>
          <div className="flex gap-3">
            {['PhonePe','Paytm','Google Pay'].map(p => (
              <button key={p} onClick={()=>setUpiProvider(p)} className={`px-4 py-2 rounded-lg border ${upiProvider===p? 'bg-white text-black':'bg-transparent text-slate-200'} border-white/20`}>{p}</button>
            ))}
          </div>
        </div>
        <button onClick={pay} className="px-5 py-3 rounded-xl bg-emerald-500 text-white font-semibold">Pay ₹{subtotal.toFixed(2)} via UPI</button>
        {status && <p className="text-emerald-400 mt-4">{status}</p>}
        {upiLink && (
          <div className="mt-3 text-slate-300">
            <a href={upiLink} className="underline text-white">Open UPI payment link</a>
          </div>
        )}
      </div>
    </div>
  )
}
