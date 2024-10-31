import Image from "next/image";

export default function Page() {
  return (
    <div className="mt-8">
      <div className="bg-red-600 text-white p-4 rounded-lg">
        <h1 className="text-3xl font-bold text-center">Yummy Pizza</h1>
      </div>
      <section className="container mx-auto p-4">
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="mb-4">
            Welcome to Yummy Pizza! We are passionate about delivering the best
            pizza experience to our customers. Our pizzas are made with the
            freshest ingredients and baked to perfection.
          </p>
          <p className="mb-4">
            There&apos;s a reason pizza is so beloved. Humans are drawn to foods
            that are fatty, sweet, rich, and complex. Pizza has all of these
            qualities, making it a universally loved dish.
          </p>

          <p className="mb-4">
            Our mission is to bring joy to our customers through delicious pizza
            and excellent service. Whether you are dining in or ordering out, we
            strive to make every meal a memorable one.
          </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <Image
              src="/aboutPic1.jpg"
              alt="Delicious Pizza"
              width={500} // Specify the width in pixels
              height={300} // Specify the height in pixels
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Our Ingredients</h3>
            <p>
              We use only the freshest ingredients to make our pizzas. From the
              dough to the toppings, every component is carefully selected to
              ensure the highest quality.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <Image
              src="/aboutPic2.jpg"
              alt="Pizza Oven"
              width={500} // Specify the width in pixels
              height={300} // Specify the height in pixels
              className="w-full h-48 object-cover rounded-md mb-4"
            />

            <h3 className="text-xl font-bold mb-2">Our Oven</h3>
            <p>
              Our state-of-the-art oven ensures that every pizza is baked to
              perfection. The high heat creates a crispy crust while keeping the
              inside soft and chewy.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
