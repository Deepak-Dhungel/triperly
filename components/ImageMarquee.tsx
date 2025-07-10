import React from "react";
import Image from "next/image";
import img1 from "@/public/travel-img/1.jpg";
import img2 from "@/public/travel-img/2.jpg";
import img3 from "@/public/travel-img/3.jpg";
import img4 from "@/public/travel-img/4.jpg";
import img5 from "@/public/travel-img/5.jpeg";
import img6 from "@/public/travel-img/6.jpg";

function ImageMarquee() {
  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <div className="py-20 w-full h-[500px] flex flex-col gap-8 overflow-hidden relative">
      {["animate-marquee-left", "animate-marquee-right"].map(
        (animation, index) => (
          <div key={index} className="relative w-full h-1/2">
            <div className={`absolute flex ${animation}`}>
              <div className="flex items-center justify-center shrink-0">
                {[...images, ...images].map((item, idx) => (
                  <div key={idx} className="w-72 h-36 mx-2 relative">
                    <Image
                      src={item}
                      fill
                      alt="carousel"
                      className="rounded-lg object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default ImageMarquee;
