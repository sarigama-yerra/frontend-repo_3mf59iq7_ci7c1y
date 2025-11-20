import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { apiGet } from '../lib/api'

const brands = ['All','Nike','Jordan','Adidas','Puma','Gucci']

export default function Shop({ onAdd }){
  const [items, setItems] = useState([])
  const [filters, setFilters] = useState({ brand:'All', size:'', minPrice:'', maxPrice:'', color:'' })

  const query = useMemo(() => {
    const q = []
    if (filters.brand && filters.brand !== 'All') q.push(`brand=${encodeURIComponent(filters.brand)}`)
    if (filters.size) q.push(`size=${filters.size}`)
    if (filters.minPrice) q.push(`minPrice=${filters.minPrice}`)
    if (filters.maxPrice) q.push(`maxPrice=${filters.maxPrice}`)
    if (filters.color) q.push(`color=${encodeURIComponent(filters.color)}`)
    return q.length ? `?${q.join('&')}` : ''
  }, [filters])

  useEffect(() => {
    (async () => {
      const data = await apiGet(`/api/products${query}`)
      setItems(data)
    })()
  }, [query])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-6">Shop</h1>
      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-4">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4">
            <h3 className="text-white font-semibold mb-2">Filters</h3>
            <label className="block text-sm text-slate-300 mb-1">Brand</label>
            <select value={filters.brand} onChange={e=>setFilters({...filters, brand:e.target.value})} className="w-full bg-slate-900 text-slate-200 rounded-lg p-2 border border-white/10">
              {brands.map(b => <option key={b}>{b}</option>)}
            </select>
            <label className="block text-sm text-slate-300 mb-1 mt-3">Size</label>
            <input value={filters.size} onChange={e=>setFilters({...filters, size:e.target.value})} placeholder="e.g., 42" className="w-full bg-slate-900 text-slate-200 rounded-lg p-2 border border-white/10" />
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Min Price</label>
                <input value={filters.minPrice} onChange={e=>setFilters({...filters, minPrice:e.target.value})} placeholder="0" className="w-full bg-slate-900 text-slate-200 rounded-lg p-2 border border-white/10" />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Max Price</label>
                <input value={filters.maxPrice} onChange={e=>setFilters({...filters, maxPrice:e.target.value})} placeholder="1000" className="w-full bg-slate-900 text-slate-200 rounded-lg p-2 border border-white/10" />
              </div>
            </div>
            <label className="block text-sm text-slate-300 mb-1 mt-3">Color</label>
            <input value={filters.color} onChange={e=>setFilters({...filters, color:e.target.value})} placeholder="Black" className="w-full bg-slate-900 text-slate-200 rounded-lg p-2 border border-white/10" />
          </div>
        </aside>
        <main className="lg:col-span-3">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map(p => (
              <ProductCard key={p.id} product={p} onQuickView={()=>{}} onAdd={onAdd} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
