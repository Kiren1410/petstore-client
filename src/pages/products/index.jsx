import Product from "./[id]";
import { getProducts } from "../api/products";
import { useQuery } from "react-query";
import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import Image from 'next/image';
export default function ProductsList(props) {
  const { data } = useQuery("products", getProducts, {
    initialData: props.data,
    refetchOnMount: false,
  });
  const slides = [
    {
      url: 'https://media.istockphoto.com/id/1351093886/photo/woman-in-pet-shop.jpg?b=1&s=170667a&w=0&k=20&c=S-xNUTioJjyqBTUxfgVpcOIutMIoZtNtYQNWzYoHsnQ=',
    },
    {
      url: 'https://images.unsplash.com/photo-1516453734593-8d198ae84bcf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0JTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    },
    {
      url: 'https://img.freepik.com/premium-photo/pet-food-accessories-various-cat-dog-domestic-animals-food-toys-treats-utensils-zoomarket-pet-store-online-shopping-pet-care-concept-flatlay-banner-top-view-copespace_136595-20454.jpg?w=2000',
    },

    {
      url: 'https://cdn.shopify.com/s/files/1/2047/0201/files/Barkery_Super_BarkingNuts_1200x.jpg?v=1663925449',
    },
    {
      url: 'https://images.pexels.com/photos/825949/pexels-photo-825949.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    
    <div className="container mx-auto px-4">
      <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-50'
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
    <div className="flex justify-center">
    <Image src="/Our Products (1).png" width={200} height={200} alt="logo" className="focus:border-none active:border-none rounded-3xl object-contain h-50 w-300" />
    </div>
    <br />
      <div className="grid sm:grid-cols-3 gap-4 py-5 my-5">
        {data.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <div className="hero min-h-screen object-cover h-50 w-full" style={{ backgroundImage: `url("https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg?auto=compress&cs=tinysrgb&w=600")` }} >
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">About Us!</h1>
      <p className="mb-5">Pets are just like your children; they make your life awesome. They are an angel in disguise on earth, brightening your day in every way possible. They are innocent, fun-loving, affectionate, and so adorable that you have a hard time leaving them alone.

Everyone dreams of owning a pet at some point in time, whether it be a dog, a cat, a bird, or anything. Pets can transform your world completely and enable you to live every day to your fullest. Pets have unique energy unlike anything else in this world, an energy that is captivating and hard to let go of.

To keep your pets satisfied and well looked after, you will need the aid of pet shops</p>
      
    </div>
  </div>
</div>
<div className="hero min-h-screen bg-accent py-10 my-10">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left px-10">
      <h1 className="text-5xl font-bold">Contact Us!</h1>
      <p className="py-6">Do you have questions? Fret not contact us here and we will get back to you as soon as possible.</p>
    </div>
    <section className="p-6 dark:text-gray-100 bg-secondary-content">
	<form novalidate="" className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow dark:bg-gray-900 ng-untouched ng-pristine ng-valid">
		<h2 className="w-full text-3xl font-bold leading-tight">Your Information</h2>
		<div>
			<label for="name" className="block mb-1 ml-1">Name</label>
			<input id="name" type="text" placeholder="Your name" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-800" />
		</div>
		<div>
			<label for="email" className="block mb-1 ml-1">Email</label>
			<input id="email" type="email" placeholder="Your email" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-800" />
		</div>
		<div>
			<label for="message" className="block mb-1 ml-1">Message</label>
			<textarea id="message" type="text" placeholder="Message..." className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-800"></textarea>
		</div>
		<div>
			<button type="submit" className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 dark:bg-violet-400 focus:ring-violet-400 hover:ring-violet-400 dark:text-gray-900">Send</button>
		</div>
	</form>
</section>
  </div>
</div>
    </div>
    
  );
}

//this function getServerSideProps will not work if its not a page.
//getStaticProps and getServerSideProps
//both allows you to fetch data in your pages. getStaticProps is used to fetch data at build time while getServerSideProps fetch data at request time (data is fetch everytime a user requests the page.).
export async function getServerSideProps() {
  const data = await getProducts();
  return {
    props: { data },
  };
}
