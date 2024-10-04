
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import MenuPage from "./menu/page";
// import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>

      <Hero />
      <HomeMenu />

      <MenuPage/>



      {/* <section className="text-center my-16" id="services">
        <SectionHeaders
          subHeader={'What We Offer'}
          mainHeader={'Our Services'}
        />

        <div className='text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4'>
          <p>
            We provide a wide range of services to meet your needs.
            Our team is dedicated to delivering top-notch solutions.
            From consulting to implementation, we've got you covered.
          </p>
          <p>
            Our expertise spans various industries and technologies.
            We tailor our services to ensure the best outcomes for our clients.
          </p>
          <p>
            Contact us today to learn more about how we can help you achieve your goals.
          </p>
        </div>
      </section>

      <section className="text-center my-8 " id="team">
        <SectionHeaders
          subHeader={'Meet the Experts'}
          mainHeader={'Our Team'}
        />
        <div className="mt-8">
          <a href='mailto:info@example.com' className='text-4xl underline text-gray-500'>
            info@example.com
          </a>
        </div>
      </section> */}

    </>
  );
}
