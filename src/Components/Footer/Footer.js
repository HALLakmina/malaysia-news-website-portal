import React from 'react'
import { Link } from 'react-router-dom'
import { CATEGORY_LIST } from '../../Util/categories'

const FOOTER_LINKS = [
  { key: 'home', name: 'Home', to: '/' },
  ...CATEGORY_LIST.map((c) => ({ key: c.key, name: c.name, to: `/news/${c.key}` })),
  { key: 'about-us', name: 'About Us', to: '/about-us' },
  { key: 'contact-us', name: 'Contact Us', to: '/contact-us' },
]

const Footer = () => (
  <footer className="bg-meridian-dark text-[#9AA2AC] mt-10 w-full">
    <div className="flex flex-col items-center gap-3.5 text-center px-4 sm:px-8 py-9">
      <div className="font-display font-extrabold text-2xl text-white tracking-tight">Malay Sri</div>
      <div className="flex flex-wrap justify-center gap-4 text-[13.5px] font-medium">
        {FOOTER_LINKS.map((link) => (
          <Link key={link.key} to={link.to} className="hover:text-white">
            {link.name}
          </Link>
        ))}
      </div>
      <div className="text-xs text-[#5C6573] mt-1">
        © {new Date().getFullYear()} Malay Sri News. Independent reporting, every hour.
      </div>
    </div>
  </footer>
)

export default Footer
