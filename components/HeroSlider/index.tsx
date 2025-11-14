import { HeroSliderProps, Slide } from './types';
import { ChevronLeft, ChevronRight } from 'lucide-react'


export default function HeroSlider({ slides, currentSlide, prevSlide, nextSlide, goToSlide }: HeroSliderProps) {
    const handlePrevSlide = () => {
        prevSlide();
    }
    const handleNextSlide = () => {
        nextSlide();
    }
    const handleGoToSlide = (index: number) => {
        goToSlide(index);
    }

    return (
        <>
            {/* Hero Slider Section */}
            <div className="relative w-full h-96 sm:h-[500px] lg:h-[600px] bg-background overflow-hidden md:rounded-lg">
                {/* Slides Container */}
                <div className="relative w-full h-full">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <div
                                className="w-full h-full bg-cover bg-bottom md:bg-center relative"
                                style={{
                                    backgroundImage: `url('${slide.image}')`,
                                }}
                            >
                                <div className="absolute inset-0 bg-black/40" />

                                <div className="relative z-10 w-full h-full flex items-end justify-center">
                                    <div className="text-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto py-4 bg-black/30 rounded-lg">
                                        <p className="text-white text-sm sm:text-base font-semibold mb-2 sm:mb-4 [text-shadow:1px_1px_2px_black] hidden lg:block">
                                            {slide.subtitle}
                                        </p>
                                        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight [text-shadow:1px_1px_2px_black] line-clamp-1">
                                            {slide.title}
                                        </h1>
                                        <p className="text-white/95 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed px-8 md:px-0 [text-shadow:1px_1px_2px_black] line-clamp-2">
                                            {slide.description}
                                        </p>
                                        <a
                                            href={slide.linkHref}
                                            className="inline-block bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300"
                                        >
                                            {slide.linkText}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
<div
  className="
    absolute left-1/2 -translate-x-1/2 top-[42%] md:top-[45%] 
    w-full px-2 sm:px-4 -translate-y-1/2 z-40
    max-w-full
    md:max-w-[40rem]
    lg:max-w-[48rem]
    xl:max-w-[64rem]
    2xl:max-w-[80rem]
    [@media(width>=96rem)]:max-w-[96rem]
    flex justify-between
  "
>
                    <button
                        onClick={handlePrevSlide}
                        className="bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all duration-300 border border-white"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8" />
                    </button>

                    <button
                        onClick={handleNextSlide}
                        className="bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all duration-300 border border-white"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8" />
                    </button>
                </div>
            </div>
            <div className="mt-4 w-fit mx-auto">
                {/* Pagination Dots - Pill Container */}
                <div className="bottom-4 sm:bottom-6 z-40 flex gap-2 items-center mb-5">
                    <div className="bg-primary rounded-full px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-sm bg-opacity-90 flex gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleGoToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center font-semibold text-xs sm:text-sm ${index === currentSlide
                                    ? 'bg-white text-primary ring-white scale-125'
                                    : 'bg-white/50 text-white hover:bg-white/70'
                                    }`}
                            >
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}