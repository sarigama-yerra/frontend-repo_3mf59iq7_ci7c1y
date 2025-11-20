import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const brandLogos = [
  { name: 'Nike', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
  { name: 'Jordan', url: 'https://upload.wikimedia.org/wikipedia/en/3/3e/Air_Jordan_Logo.svg' },
  { name: 'Adidas', url: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
  { name: 'Puma', url: 'https://upload.wikimedia.org/wikipedia/en/f/fd/Puma_AG.svg' },
  { name: 'Gucci', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Gucci_Logo.svg' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.25),transparent_40%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
              Elevate Your Step
            </motion.h1>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.6}} className="mt-6 text-lg text-slate-300">
              Discover the most sought-after sneakers from Nike, Jordan, Adidas, Puma, and Gucci. Premium quality, authentic selection, fast delivery.
            </motion.p>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.6}} className="mt-8 flex items-center gap-4">
              <Link to="/shop" className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:scale-105 transition">Shop Now</Link>
              <a href="#collections" className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition">Explore Collections</a>
            </motion.div>
            <div className="mt-10 grid grid-cols-5 gap-6 opacity-80">
              {brandLogos.map(b => (
                <img key={b.name} src={b.url} alt={b.name} className="h-8 object-contain invert" />
              ))}
            </div>
          </div>
          <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.6}} className="relative">
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop" alt="Hero Shoe" className="rounded-3xl shadow-2xl ring-1 ring-white/10" />
            <div className="absolute -z-10 -inset-6 bg-gradient-to-tr from-blue-500/20 to-pink-500/10 blur-3xl rounded-[3rem]" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
