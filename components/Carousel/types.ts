export interface CarouselItem {
  id: number
  image: string
  title: string
  author: string
  link: string
}
export interface CarouselProps {
  carouselItems: CarouselItem[]
}