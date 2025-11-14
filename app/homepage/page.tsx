'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import HeroSlider from '@/components/HeroSlider';

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
        <HeroSlider slides={slides} currentSlide={currentSlide} prevSlide={prevSlide} nextSlide={nextSlide} goToSlide={goToSlide} />
      </main>

      <Footer />
    </div>
  )
}
