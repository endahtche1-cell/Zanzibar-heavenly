'use client'

import Image from 'next/image'

interface ImagePlaceholderProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  sizes?: string
}

export default function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  fill,
  className = '',
  priority = false,
  sizes,
}: ImagePlaceholderProps) {
  const placeholderStyle = {
    background: 'linear-gradient(135deg, #f0eee8 0%, #e8e5de 50%, #f7f6f2 100%)',
  }

  if (fill) {
    return (
      <div className="absolute inset-0" style={placeholderStyle}>
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${className}`}
          priority={priority}
          sizes={sizes || '100vw'}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden" style={placeholderStyle}>
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 600}
        className={`object-cover ${className}`}
        priority={priority}
        sizes={sizes}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none'
        }}
      />
    </div>
  )
}
