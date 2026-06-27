import React from 'react'
import { Link } from 'react-router-dom'
import { formatNewsDate } from '../../Util/formatDate'

const CategoryBlock = ({ category, articles = [] }) => {
  if (!articles.length) return null

  const featured = articles[0]
  const cards = articles.slice(1, 5)

  return (
    <section className="px-4 sm:px-8 lg:px-14 py-7 lg:py-10 border-b border-meridian-border">
      <div className="flex items-end justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5" style={{ background: category.color }} />
          <h2 className="font-display font-extrabold tracking-tight text-meridian-ink text-[21px] lg:text-[26px] m-0">
            {category.name}
          </h2>
        </div>
        <Link
          to={`/news/${category.key}`}
          className="flex items-center gap-1.5 text-meridian-navy font-semibold text-[13.5px] flex-none hover:gap-2"
        >
          View all <span>&rarr;</span>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        <Link
          to={`/news/${category.key}/${featured._id}`}
          className="block flex-none lg:basis-[41%] w-full min-w-0 group"
        >
          {featured.image?.storageName ? (
            <img
              src={`/${featured.image.storageName}`}
              alt=""
              className="w-full aspect-video object-cover rounded mb-3"
            />
          ) : (
            <div className="w-full aspect-video bg-meridian-chip rounded mb-3" />
          )}
          <div
            className="font-display font-bold text-[11.5px] tracking-[.1em] uppercase mb-0.5"
            style={{ color: category.color }}
          >
            {category.name}
          </div>
          <h3 className="font-display font-bold tracking-tight leading-tight text-meridian-ink text-[20px] lg:text-[23px] m-0 group-hover:text-meridian-navy">
            {featured.topic}
          </h3>
          <p className="text-meridian-body text-sm leading-relaxed mt-2">{featured.description}</p>
          <div className="text-meridian-faint text-xs mt-2.5 font-medium">
            {formatNewsDate(featured.createdAt)}
          </div>
        </Link>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-0 sm:gap-6 min-w-0">
          {cards.map((card) => (
            <Link
              key={card._id}
              to={`/news/${category.key}/${card._id}`}
              className="flex sm:flex-col gap-3.5 sm:gap-2.5 items-center sm:items-stretch py-3.5 sm:py-0 border-t sm:border-t-0 border-meridian-border first:border-t-0 group"
            >
              {card.image?.storageName ? (
                <img
                  src={`/${card.image.storageName}`}
                  alt=""
                  className="flex-none w-28 h-20 sm:w-full sm:h-auto sm:aspect-video object-cover rounded block"
                />
              ) : (
                <div className="flex-none w-28 h-20 sm:w-full sm:h-auto sm:aspect-video bg-meridian-chip rounded" />
              )}
              <div className="min-w-0 flex-1">
                <h4 className="font-display font-bold tracking-tight leading-snug text-meridian-ink text-[15.5px] sm:text-base m-0 group-hover:text-meridian-navy">
                  {card.topic}
                </h4>
                <div className="text-meridian-faint text-xs mt-1.5 font-medium">
                  {formatNewsDate(card.createdAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryBlock
