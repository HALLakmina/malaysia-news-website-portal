import React from 'react'

const AboutUs = () => {
  return (
    <section className="w-full">
        <div className="flex flex-col md:flex-row items-center w-full mt-20">
            <div className="w-full md:w-1/2 px-2">
                <p className="heading-font-4">About Us</p>
                <p className="body-font-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Est quibusdam odio minus atque suscipit magnam enim perferendis 
                    voluptatem omnis harum nesciunt aut molestiae facere aspernatur, 
                    reiciendis minima doloribus qui impedit!
                </p>
            </div>
            <img src="/assets/images/website-images/about-us-main-image.png" alt=""  className="w-full md:w-1/2 px-2"/>
        </div>
        <div className="w-full flex flex-row items-center justify-center mt-20">
            <div className="flex flex-col items-center justify-center">
                <div>
                    <img src="/assets/images/profile-images/profile-image-01.webp" alt="" className="rounded-full border-white border-2 object-cover h-40 w-40"/>
                </div>
                <p className="heading-font-4">Nayanajith</p>
                <p className="heading-font-5 color-text-on-ash-gray">CEO/FOUNDER</p>
            </div>
        </div>
    </section>
  )
}

export default AboutUs