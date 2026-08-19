import { describe, it, expect } from 'vitest'
import { cn } from './src/lib/utils'

describe('cn utility', () => {
  it('merges classes correctly', () => {
    const result = cn('class1', 'class2', 'class1')
    expect(result).toContain('class1')
    expect(result).toContain('class2')
  })

  it('handles conditional classes', () => {
    const active = true
    const inactive = false
    const result = cn('base', active && 'active', inactive && 'inactive')
    expect(result).toContain('base')
    expect(result).toContain('active')
    expect(result).not.toContain('inactive')
  })
})
