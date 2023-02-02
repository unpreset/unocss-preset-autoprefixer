import { createGenerator, escapeSelector } from 'unocss'
import presetUno from '@unocss/preset-uno'
import { describe, expect, test } from 'vitest'
import presetPrefixer from '../src'

describe('preset-prefixer', () => {
  const uno = createGenerator({
    presets: [presetUno(), presetPrefixer()],
  })

  test('flex autoprefixer', async () => {
    const { css } = await uno.generate(['flex'], { preflights: false })

    expect(css).toMatchSnapshot()
  })

  test('text space', async () => {
    const { css } = await uno.generate(['text-1'], { preflights: false })

    expect(css).toMatchSnapshot()
  })

  test('font weight', async () => {
    const { css } = await uno.generate(['font-400', 'font-bold'], { preflights: false })

    expect(css).toMatchSnapshot()
  })

  test('background gradient', async () => {
    const { css } = await uno.generate(['bg-gradient-to-tr', 'from-purple-500', 'to-pink-500'], { preflights: false })

    expect(css).toMatchSnapshot()
  })

  test('p-x', async () => {
    const { css } = await uno.generate(['px-10'], { preflights: false })

    expect(css).toMatchSnapshot()
  })
  test('space-x', async () => {
    const { css } = await uno.generate(['space-x-10'], { preflights: false })

    expect(css).toMatchSnapshot()
  })
})
