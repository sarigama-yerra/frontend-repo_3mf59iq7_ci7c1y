import { Link } from 'react-router-dom'

export default function Cart({ cart, onInc, onDec, onRemove }){
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-slate-300">Your cart is empty. <Link className="text-white underline" to="/shop">Continue shopping</Link></div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                <img src={item.images?.[0]} alt={item.title} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="text-white font-semibold">{item.title}</div>
                  <div className="text-slate-400 text-sm">{item.brand} • Size {item.size} • {item.color}</div>
                  <div className="text-white mt-1">₹{item.price}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={()=>onDec(idx)} className="px-2 py-1 rounded bg-white/10 text-white">-</button>
                    <span className="text-white">{item.quantity}</span>
                    <button onClick={()=>onInc(idx)} className="px-2 py-1 rounded bg-white/10 text-white">+</button>
                  </div>
                </div>
                <button onClick={()=>onRemove(idx)} className="text-slate-300 hover:text-white">Remove</button>
              </div>
            ))}
          </div>
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 h-fit">
            <h3 className="text-white font-semibold mb-4">Order Summary</h3>
            <div className="flex items-center justify-between text-slate-300 mb-2">
              <span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300 mb-4">
              <span>Shipping</span><span>₹0</span>
            </div>
            <div className="flex items-center justify-between text-white font-bold text-lg">
              <span>Total</span><span>₹{subtotal.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="mt-6 block text-center px-5 py-3 rounded-xl bg-emerald-500 text-white font-semibold">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  )
}
