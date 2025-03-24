import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo({ images = [] }) {
  return (
    <Carousel className="w-full max-w-[1000px] relative">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <img
                src={image}
                alt={`Hotel Image ${index + 1}`}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 rounded-full border border-border-light bg-white/80 text-primary-dark hover:bg-white transition-colors duration-200 ease-out shadow-md" />
      <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 rounded-full border border-border-light bg-white/80 text-primary-dark hover:bg-white transition-colors duration-200 ease-out shadow-md" />
    </Carousel>
  );
}
