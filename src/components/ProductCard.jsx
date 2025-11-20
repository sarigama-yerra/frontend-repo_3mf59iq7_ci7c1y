import { Eye, Star } from 'lucide-react'

export default function ProductCard({ product, onQuickView, onAdd }) {
  return (
    <div className="group bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 transition relative">
      <div className="aspect-square overflow-hidden bg-slate-900">
        <img src={product.images?.[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold truncate">{product.title}</h3>
          <div className="flex items-center gap-1 text-amber-400 text-sm">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{product.rating?.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-slate-400 text-sm mt-1">{product.brand}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-white font-bold">₹{product.price}</span>
          <div className="flex gap-2">
            <button onClick={() => onQuickView(product)} className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 flex items-center gap-1"><Eye className="w-4 h-4"/> Quick View</button>
            <button onClick={() => onAdd(product)} className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600">Add</button>
          </div>
        </div>
      </div>
      {product.is_best_seller && (
        <span className="absolute left-3 top-3 text-xs bg-amber-500 text-black px-2 py-1 rounded">Best Seller</span>
      )}
      {product.is_new && (
        <span className="absolute right-3 top-3 text-xs bg-emerald-500 text-black px-2 py-1 rounded">New</span>
      )}
    </div>
  )
}
