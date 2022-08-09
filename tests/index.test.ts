import { createGenerator, escapeSelector } from 'unocss'
import presetUno from '@unocss/preset-uno'
import { describe, expect, test } from 'vitest'
import presetPrefixer from '../src'

describe('preset-prefixer', () => {
  const uno = createGenerator({
    presets: [
      presetUno(),
      presetPrefixer()
    ],
  })

  test('flex autoprefixer', async () => {

    const { css } = await uno.generate(['flex'], { preflights: false})

    expect(css).toBe(`/* layer: default */\n.flex{display:-webkit-box;display:-webkit-flex;display:flex;}`)
  })
})
