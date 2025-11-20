import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import './index.css'

function App() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pk-cart') || '[]') } catch { return [] }
  })
  const navigate = useNavigate()

  useEffect(() => { localStorage.setItem('pk-cart', JSON.stringify(cart)) }, [cart])

  const addToCart = (p) => {
    const idx = cart.findIndex(i => i.id === p.id && i.size === p.size && i.color === p.color)
    if (idx >= 0) {
      const copy = [...cart]
      copy[idx].quantity += 1
      setCart(copy)
    } else {
      setCart([...cart, { ...p, quantity: 1 }])
    }
  }

  const inc = (i) => { const c=[...cart]; c[i].quantity++; setCart(c) }
  const dec = (i) => { const c=[...cart]; c[i].quantity=Math.max(1,c[i].quantity-1); setCart(c) }
  const removeItem = (i) => { const c=[...cart]; c.splice(i,1); setCart(c) }
  const clear = () => setCart([])

  const cartCount = useMemo(() => cart.reduce((s,i)=>s+i.quantity,0), [cart])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home onAdd={addToCart} />} />
        <Route path="/shop" element={<Shop onAdd={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail onAdd={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart cart={cart} onInc={inc} onDec={dec} onRemove={removeItem} />} />
        <Route path="/checkout" element={<Checkout cart={cart} onClear={clear} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
