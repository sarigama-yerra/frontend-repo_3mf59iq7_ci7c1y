export default function Footer(){
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-slate-400 text-sm flex flex-col md:flex-row items-center justify-between">
        <p>© {new Date().getFullYear()} PrimeKicks — All rights reserved.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="https://wa.me/919999999999" className="hover:text-white">WhatsApp</a>
        </div>
      </div>
    </footer>
  )
}
