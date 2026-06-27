import React from 'react'
import { Link } from 'react-router-dom'
import { getCategoryMeta } from '../../Util/categories'
import { formatNewsDate } from '../../Util/formatDate'

const LeadSection = ({ articles = [] }) => {
  if (!articles.length) return null

  const lead = articles[0]
  const rail = articles.slice(1, 5)
  const leadMeta = getCategoryMeta(lead.category)

  const limitDescription =(description)=>{
    const maxLength = 300;
    if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...';
    }
    return description;
  }


  return (
    <div className="px-4 sm:px-8 lg:px-14 pt-6 sm:pt-9">
      <div className="flex flex-col lg:flex-row gap-7 lg:gap-11 items-start pb-7 lg:pb-9 border-b border-meridian-border">
        <article className="flex-1 lg:basis-[72%] w-full min-w-0">
          <Link to={`/news/${lead.category}/${lead._id}`} className="block group">
            <div className="relative">
              {lead.image?.storageName ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}/${lead.image.storageName}`}
                  alt=""
                  className="w-full aspect-video object-cover rounded"
                />
              ) : (
                <div className="w-full aspect-video bg-meridian-chip rounded" />
              )}
              <div className="absolute top-3.5 left-3.5 bg-meridian-red text-white font-display font-bold text-[11px] tracking-[.1em] px-2.5 py-1.5 rounded-[3px]">
                LIVE
              </div>
            </div>
            <div
              className="font-display font-bold text-[12px] tracking-[.1em] uppercase mt-4 mb-2"
              style={{ color: leadMeta.color }}
            >
              {leadMeta.name}
            </div>
            <h2 className="font-display font-extrabold tracking-tight leading-[1.08] text-meridian-ink text-[28px] sm:text-[36px] lg:text-[46px] m-0 group-hover:text-meridian-navy">
              {lead.topic}
            </h2>
            <p className="text-meridian-body text-[15px] sm:text-[17px] leading-relaxed mt-3.5">
              {limitDescription(lead.description)}
            </p>
            <div className="text-meridian-faint text-[13px] font-medium mt-3.5">
              {formatNewsDate(lead.createdAt)}
            </div>
          </Link>
        </article>

        <aside className="flex-1 lg:basis-[28%] w-full min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 bg-meridian-navy" />
            <h3 className="font-display font-extrabold text-[13px] tracking-[.12em] uppercase text-meridian-ink m-0">
              Top Stories
            </h3>
          </div>
          {rail.map((item) => {
            const meta = getCategoryMeta(item.category)
            return (
              <Link
                key={item._id}
                to={`/news/${item.category}/${item._id}`}
                className="block py-4 border-t border-meridian-border group"
              >
                <div
                  className="font-display font-bold text-[11.5px] tracking-[.1em] uppercase mb-0.5"
                  style={{ color: meta.color }}
                >
                  {meta.name}
                </div>
                <div className="font-display font-bold text-[16.5px] leading-snug tracking-tight text-meridian-ink group-hover:text-meridian-navy">
                  {item.topic}
                </div>
                <div className="text-meridian-faint text-xs mt-1.5 font-medium">
                  {formatNewsDate(item.createdAt)}
                </div>
              </Link>
            )
          })}
        </aside>
      </div>
    </div>
  )
}

export default LeadSection
