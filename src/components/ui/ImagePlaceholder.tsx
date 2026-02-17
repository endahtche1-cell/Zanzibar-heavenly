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
  loading?: 'lazy' | 'eager'
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
  loading,
}: ImagePlaceholderProps) {
  if (fill) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0eee8] via-[#e8e5de] to-[#f7f6f2]">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${className}`}
          priority={priority}
          sizes={sizes || '100vw'}
          loading={priority ? undefined : (loading || 'lazy')}
        />
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#f0eee8] via-[#e8e5de] to-[#f7f6f2]">
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 600}
        className={`object-cover ${className}`}
        priority={priority}
        sizes={sizes}
        loading={priority ? undefined : (loading || 'lazy')}
      />
    </div>
  )
}
