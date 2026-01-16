export interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  linkText: string
  linkHref: string
  image: string
}
export interface HeroSliderProps {
  slides: Slide[];  
}