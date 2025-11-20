import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import { apiGet, seedIfNeeded } from '../lib/api'

export default function Home({ onAdd }){
  const [featured, setFeatured] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [best, setBest] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    (async () => {
      await seedIfNeeded()
      const f = await apiGet('/api/products?best=true&limit=8')
      const n = await apiGet('/api/products?new=true&limit=8')
      const b = await apiGet('/api/products?best=true&limit=8')
      const r = await apiGet('/api/reviews')
      setFeatured(f)
      setNewArrivals(n)
      setBest(b)
      setReviews(r)
    })()
  }, [])

  return (
    <div>
      <Hero />
      <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Collections</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} onQuickView={() => {}} onAdd={onAdd} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">New Arrivals</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(p => (
            <ProductCard key={p.id} product={p} onQuickView={() => {}} onAdd={onAdd} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-white mb-6">Best Sellers</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {best.map(p => (
            <ProductCard key={p.id} product={p} onQuickView={() => {}} onAdd={onAdd} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-white mb-6">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map(r => (
            <div key={r.id} className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 text-slate-300">
              <div className="text-white font-semibold">{r.name}</div>
              <div className="text-amber-400 text-sm">★ {r.rating}</div>
              <p className="mt-2">{r.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
