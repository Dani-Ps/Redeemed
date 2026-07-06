import { useEffect, useState } from 'react'
import { getPhoto } from './photoDb'

/**
 * Loads a photo blob from IndexedDB by id and exposes a revocable object URL.
 * Returns null while loading or if the blob is missing.
 */
export function usePhotoUrl(imagenId: string | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!imagenId) {
      setUrl(null)
      return
    }
    let objectUrl: string | null = null
    let active = true

    getPhoto(imagenId).then((blob) => {
      if (!active || !blob) return
      objectUrl = URL.createObjectURL(blob)
      setUrl(objectUrl)
    })

    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [imagenId])

  return url
}
