import React from 'react'
import NewsCard from '../Components/NewsCard'
import SlidShow from '../Components/SlidShow'
import NewsBar from '../Components/NewsBar'
const Index = () => {
  return (
    <>
        <SlidShow/>
        <section>
          <NewsBar 
            heading={"US economy regains speed in second quarter; price pressures easing"}
            description={"The U.S. economy grew faster than expected in the second quarter amid solid gains in consumer spending and business investment, but inflation pressures subsided, leaving intact expectations of a September interest rate cut from the Federal Reserve."}
            image={'/assets/images/news-images/news-01.avif'}
            category={"WORLD"}
          />
          <NewsBar 
            heading={"Olympics Live: Tight security in Paris as football, handball and archery begin"}
            description={"Paris is putting the finishing touches to preparations for the Olympic Games opening ceremony on Friday. Some events have already started."}
            image={'/assets/images/news-images/news-02.avif'}
            category={"SPORT"}
          />
        </section>
        <section className='flex flex-wrap items-center justify-evenly   w-full'>
          <NewsCard/>
          <NewsCard/>
          <NewsCard/>
        </section>
    </>
  )
}

export default Index