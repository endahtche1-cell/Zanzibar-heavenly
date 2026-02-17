import type { ReactNode } from 'react'

interface ImageHoverZoomProps {
  children: ReactNode
  className?: string
}

export function ImageHoverZoom({ children, className = '' }: ImageHoverZoomProps) {
  return (
    <div className={`relative overflow-hidden group/zoom ${className}`}>
      <div className="relative h-full w-full transition-transform duration-500 ease-out group-hover/zoom:scale-105">
        {children}
      </div>
    </div>
  )
}

interface FadeInViewProps {
  children: ReactNode
  className?: string
}

export function FadeInView({ children, className = '' }: FadeInViewProps) {
  return (
    <div className={`animate-fade-in-view ${className}`}>
      {children}
    </div>
  )
}

interface StaggerGridProps {
  children: ReactNode
  className?: string
}

export function StaggerGrid({ children, className = '' }: StaggerGridProps) {
  return (
    <div className={`stagger-grid ${className}`}>
      {children}
    </div>
  )
}

export function StaggerGridItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`stagger-grid-item ${className}`}>
      {children}
    </div>
  )
}
