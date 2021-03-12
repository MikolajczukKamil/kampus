import { CSSProperties } from 'react'

export const clickableOnMapMixin = (): CSSProperties => ({
  pointerEvents: 'auto !important' as 'auto',
})
