import { Link } from "react-router-dom";

const AboutLetstay = () => {
  return (
    <section className="bg-[#faf8f3] px-6 py-20 md:px-16 lg:px-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

        
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#b08d45]">
            About Letstay
          </p>

          <h2 className="mb-6 text-4xl font-semibold leading-tight text-[#252525] md:text-5xl">
            Find your place.
            <br />
            <span className="text-[#b08d45]">Feel at home.</span>
          </h2>

          <p className="mb-6 max-w-xl text-lg leading-8 text-gray-600">
            Letstay is a modern hotel-booking platform designed to make
            finding the right stay simple, comfortable, and reliable.
          </p>

          <p className="mb-8 max-w-xl leading-7 text-gray-500">
            We connect travelers with thoughtfully selected hotels, helping
            them discover welcoming spaces that feel like home. From
            exploring destinations and comparing rooms to making a
            reservation with confidence, Letstay makes every step effortless.
          </p>

          <Link to = '/rooms'
            className="rounded-full bg-[#252525] px-7 py-3.5
                       text-sm font-medium text-white transition
                       hover:bg-[#b08d45]"
                
          >
            Explore Our Stays
          </ Link>
        </div>

       
        <div className="relative flex min-h-[380px] items-center justify-center
                        overflow-hidden rounded-3xl bg-[#252525] p-10">

         
          <div className="absolute -right-16 -top-16 h-48 w-48
                          rounded-full bg-[#b08d45] opacity-20" />

          <div className="absolute -bottom-20 -left-16 h-48 w-48
                          rounded-full bg-[#b08d45] opacity-20" />

          <div className="relative text-center">
            
            <div className="mx-auto mb-6 flex h-24 w-24 items-end justify-center
                            border-b-8 border-l-8 border-[#b08d45]">

              <div className="mb-0 h-16 w-10 rounded-t-lg
                              border-4 border-[#f5f0e6]
                              border-b-0" />
            </div>

            <h3 className="text-4xl font-semibold tracking-tight text-white">
              Let<span className="text-[#b08d45]">stay</span>
            </h3>

            <p className="mt-3 text-sm tracking-[0.2em] text-gray-400">
              YOUR PLACE. YOUR STAY.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutLetstay;