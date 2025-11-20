import { useState } from 'react'
import { apiPost } from '../lib/api'

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [status, setStatus] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    try {
      await apiPost('/api/contact', form)
      setStatus('Message sent! We will get back soon.')
      setForm({ name:'', email:'', message:'' })
    } catch {
      setStatus('Something went wrong. Please try again later.')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Contact Us</h1>
      <form onSubmit={submit} className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 space-y-4">
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Your name" className="w-full bg-slate-900 text-slate-200 rounded-lg p-3 border border-white/10" required />
        <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full bg-slate-900 text-slate-200 rounded-lg p-3 border border-white/10" required />
        <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} placeholder="Message" className="w-full bg-slate-900 text-slate-200 rounded-lg p-3 border border-white/10 h-32" required />
        <div className="flex items-center gap-3">
          <button className="px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold">Send</button>
          <a href="https://wa.me/919999999999" className="px-5 py-3 rounded-xl bg-emerald-500 text-white font-semibold">WhatsApp</a>
        </div>
      </form>
      {status && <p className="text-emerald-400 mt-3">{status}</p>}
      <div className="mt-8 text-slate-300">
        <h2 className="text-xl text-white font-semibold mb-2">Store Address</h2>
        <p>PrimeKicks Studio, Sector 18, Noida, UP</p>
      </div>
    </div>
  )
}
