import ImageFallback from "@/helpers/ImageFallback";
import React from "react";

const About = ({ data }: { data: any[] }) => {
  return (
    <section className="section-sm bg-gradient" id="features">
      <div className="container">
        <h1 className="text-center mb-4">Our Benefits</h1>
        <div className="row justify-between">
          {data &&
            data.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl md:col-7 2xl:col-3 2xl:w-[22%] lg:col-4 p-4 py-10 text-center hover:shadow-2xl`}
              >
                <ImageFallback
                  src={item.image}
                  className="rounded-full w-16 h-16 mx-auto object-contain p-0 mb-4"
                  height={70}
                  width={70}
                  alt={item.title}
                />
                <h4 className="mb-4">{item.title}</h4>
                <p className="text-gray-500 text-lg">{item.content}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default About;
