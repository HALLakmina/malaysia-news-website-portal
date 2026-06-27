import React from 'react'

const VALUES = [
  {
    title: 'Accuracy first',
    body: 'Every story is checked before it is published. When we get something wrong, we correct it openly and quickly.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: 'Independent reporting',
    body: 'We cover Sri Lankan and Malaysian news, gossip, sport and world stories without favouring any party or sponsor.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a15 15 0 0 1 0 18" />
        <path d="M12 3a15 15 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    title: 'Accountable',
    body: 'We hold the stories we cover to a high standard, and we hold ourselves to that same standard.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
      </svg>
    ),
  },
]

const AboutUs = () => {
  return (
    <div className="bg-white">
      <div className="px-4 sm:px-8 lg:px-14 pt-7 sm:pt-9 pb-7 sm:pb-9 border-b border-meridian-border">
        <div className="text-meridian-navy font-display font-bold text-xs tracking-[.12em] uppercase mb-3.5">
          About Malay Sri
        </div>
        <h1 className="font-display font-extrabold tracking-tight leading-tight text-meridian-ink text-[28px] sm:text-[40px] lg:text-[46px] m-0">
          Independent news for the Sri Lankan and Malaysian community.
        </h1>
        <p className="text-[#3A434E] text-[16px] sm:text-[18px] leading-relaxed font-medium mt-4 max-w-[760px]">
          Malay Sri News covers Sri Lankan and Malaysian news, gossip, sport and world stories, reported clearly and
          without the noise.
        </p>
      </div>

      <section className="px-4 sm:px-8 lg:px-14 py-7 lg:py-10 border-b border-meridian-border">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <img
            src="/assets/images/website-images/about-us-main-image.png"
            alt=""
            className="flex-1 w-full aspect-[4/3] object-cover rounded-md min-w-0"
          />
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-extrabold tracking-tight text-meridian-ink text-[21px] lg:text-[26px] m-0">
              Why we exist
            </h2>
            <p className="text-[#3A434E] text-[15.5px] lg:text-[16.5px] leading-relaxed mt-3.5">
              We started Malay Sri News to give Sri Lankan and Malaysian readers a single place for the stories that
              matter to them — written clearly, updated often, and free of clickbait.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-8 lg:px-14 py-7 lg:py-10 border-b border-meridian-border">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-2.5 h-2.5 bg-meridian-navy flex-none" />
          <h2 className="font-display font-extrabold tracking-tight text-meridian-ink text-[21px] lg:text-[26px] m-0">
            What we stand for
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 sm:gap-8">
          {VALUES.map((v) => (
            <div key={v.title} className="border-t-2 border-meridian-ink pt-4">
              <div className="w-[42px] h-[42px] rounded-[10px] bg-[#EEF2FB] text-meridian-navy grid place-items-center mb-3.5">
                {v.icon}
              </div>
              <h3 className="font-display font-extrabold text-lg tracking-tight m-0 mb-1.5">{v.title}</h3>
              <p className="text-[#5B6573] text-[14.5px] leading-relaxed m-0">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-8 lg:px-14 py-7 lg:py-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-2.5 h-2.5 bg-meridian-navy flex-none" />
          <h2 className="font-display font-extrabold tracking-tight text-meridian-ink text-[21px] lg:text-[26px] m-0">
            Founder
          </h2>
        </div>
        <div className="flex flex-col items-center text-center max-w-xs">
          <img
            src="/assets/images/profile-images/profile-image-01.webp"
            alt="Nayanajith"
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-white shadow mb-3.5"
          />
          <h3 className="font-display font-bold text-base tracking-tight m-0">Nayanajith</h3>
          <div className="text-meridian-navy text-[13px] font-semibold mt-1">CEO / Founder</div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
