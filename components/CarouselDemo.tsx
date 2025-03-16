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
    <Carousel className="w-full max-w-[1000px]">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <img
                src={image}
                alt={`Hotel Image ${index + 1}`}
                className="w-full h-[600px] object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:block rounded-lg border border-border-light bg-primary-light text-text-light dark:bg-text-dark dark:text-primary-dark cursor-pointer hover:bg-primary-light/90  transition-colors duration-200 ease-out" />
      <CarouselNext className="hidden lg:block rounded-lg border border-border-light bg-primary-light text-text-light dark:bg-text-dark dark:text-primary-dark cursor-pointer hover:bg-primary-light/90 transition-colors duration-200 ease-out" />
    </Carousel>
  );
}
