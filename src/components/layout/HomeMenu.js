import Image from "next/image";


export default function HomeMenu() {
    return (
        <section className="">
            <div className="absolute h-full left-0 right-0 w-full justify-start">
                <div className="absolute left-0 -top-[70px] -z-10 text-left">
                    <Image src={'/sallad1.png'} width={109} height={189} />
                </div>
                <div className="h-48  absolute right-0 -top-24 -z-10">
                    <Image src={'/sallad2.png'} width={107} height={195} />
                </div>
            </div>
            <div className="text-center">
                <h3 className="uppercase text-gray-500 font-semibold leading-4">Check Out</h3>
                <h2 className="text-primary font-bold text-4xl italic">Menu</h2>
            </div>
        </section>
    )
}