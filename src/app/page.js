
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>

      <Hero />
      <HomeMenu />

      <section className="text-center my-16">
        <SectionHeaders
          subHeader={'Our Story'}
          mainHeader={'About Us'}
        />

        <div className='text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4'>
          <p>
            Out believe has request not how comfort evident.
            Up delight cousins we feeling minutes. Genius has looked end piqued spring.
            Down has rose feel find man. Learning day desirous informed expenses material returned
            six the. She enabled invited exposed him another. Reasonably conviction solicitude
            me mr at discretion reasonable. Age out full gate bed day lose.
          </p>
          <p>
            Out believe has request not how comfort evident.
            Up delight cousins we feeling minutes. Genius has looked end piqued spring.
            Down has rose feel find man.
          </p>
          <p>
            Out believe has request not how comfort evident.
            Up delight cousins we feeling minutes.
          </p>
        </div>
      </section>

      <section className="text-center my-8">
        <SectionHeaders
          subHeader={'Don\'t Hesitate'}
          mainHeader={'Contact Us'}
        />
        <div className="mt-8">
          <a href='123456789' className='text-4xl underline text-gray-500'>
            123456789
          </a>
        </div>
      </section>

    </>
  );
}
