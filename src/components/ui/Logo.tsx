import lockup from '../../assets/logo/veith-logo.svg'
import lockupInverse from '../../assets/logo/veith-logo-inverse.svg'
import wordmark from '../../assets/logo/veith-wordmark.svg'
import wordmarkInverse from '../../assets/logo/veith-wordmark-inverse.svg'

interface LogoProps {
  /**
   * 'lockup' carries the GEBÄUDETECHNIK line and is used where the brand is
   * introduced — the footer, the contact page. 'wordmark' drops it for tight
   * spaces like the sticky header.
   */
  variant?: 'lockup' | 'wordmark'
  /** Reversed artwork for dark grounds. */
  inverse?: boolean
  /** Rendered height; width follows the artwork's ratio. */
  height?: number
  className?: string
}

const ART = {
  lockup: { light: lockup, dark: lockupInverse, ratio: 185 / 103 },
  wordmark: { light: wordmark, dark: wordmarkInverse, ratio: 185 / 78.5 },
}

/**
 * The VEITH mark. The artwork is traced from the original in
 * scripts/build-logo.mjs; this only picks the right file and sizes it.
 */
export function Logo({
  variant = 'wordmark',
  inverse = false,
  height = 40,
  className,
}: LogoProps) {
  const art = ART[variant]
  return (
    <img
      className={className}
      src={inverse ? art.dark : art.light}
      alt="VEITH Gebäudetechnik"
      height={height}
      width={Math.round(height * art.ratio)}
      style={{ height, width: 'auto' }}
    />
  )
}
