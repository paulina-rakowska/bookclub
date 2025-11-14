'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  linkText: string
  linkHref: string
  image: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Explore Our Book Catalogue',
    subtitle: 'Discover your next favorite read',
    description: 'Browse our curated collection of books across all genres, discover hidden gems, and find your next page-turner.',
    linkText: 'Browse Books →',
    linkHref: '/books',
    image: '/images/slides/library-with-books-and-reading-nook.jpg',
  },
  {
    id: 2,
    title: 'Discover Incredible Authors',
    subtitle: 'Explore diverse literary voices',
    description: 'Learn about talented authors, discover their works, and connect with the creative minds behind your favorite stories.',
    linkText: 'Explore Authors →',
    linkHref: '/authors',
    image: '/images/slides/person-writing-book-review-at-desk.jpg',
  },
  {
    id: 3,
    title: 'Connect with Book Lovers',
    subtitle: 'Build your reading community',
    description: 'Join discussion groups, follow authors, and engage with readers who share your literary interests.',
    linkText: 'Join Community →',
    linkHref: '/register',
    image: '/images/slides/book-club-meeting-discussing-literature.jpg',
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlay])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Slider Section */}
        <div className="relative w-full max-w-6xl mx-auto h-96 sm:h-[500px] lg:h-[600px] bg-background overflow-hidden rounded-lg mt-8 px-4">
          {/* Slides Container */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className="w-full h-full bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/40" />
                  
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="text-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
                      <p className="text-white text-sm sm:text-base font-semibold mb-2 sm:mb-4">
                        {slide.subtitle}
                      </p>
                      <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-white/95 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
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
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="mt-4 w-fit mx-auto">
                  {/* Pagination Dots - Pill Container */}
          <div className="bottom-4 sm:bottom-6 z-40 flex gap-2 items-center mb-5">
            <div className="bg-primary rounded-full px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-sm bg-opacity-90 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center font-semibold text-xs sm:text-sm ${
                    index === currentSlide
                      ? 'bg-white text-primary ring-white scale-125'
                      : 'bg-white/50 text-white hover:bg-white/70'
                  }`}
                >
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
