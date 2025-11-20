import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ cartCount }) {
  const [open, setOpen] = useState(false)
  const navLink = ({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition hover:text-white ${isActive ? 'text-white' : 'text-slate-300'}`

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="text-white font-bold text-xl">PrimeKicks</span>
            <span className="text-xs text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/30">Premium</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/shop" className={navLink}>Shop</NavLink>
            <NavLink to="/about" className={navLink}>About</NavLink>
            <NavLink to="/contact" className={navLink}>Contact</NavLink>
            <NavLink to="/cart" className="relative text-slate-200 hover:text-white">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 inline-flex items-center justify-center rounded-full">{cartCount}</span>
              )}
            </NavLink>
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden text-slate-200">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <NavLink onClick={() => setOpen(false)} to="/shop" className="block text-slate-200">Shop</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/about" className="block text-slate-200">About</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contact" className="block text-slate-200">Contact</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/cart" className="block text-slate-200">Cart ({cartCount})</NavLink>
          </div>
        )}
      </div>
    </header>
  )
}
