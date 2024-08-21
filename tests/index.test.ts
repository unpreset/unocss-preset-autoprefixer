import { createGenerator } from 'unocss'
import presetUno from '@unocss/preset-uno'
import { describe, expect, test } from 'vitest'
import presetPrefixer from '../src'

describe('preset-prefixer', () => {
  const uno = createGenerator({
    presets: [
      presetUno(),
      presetPrefixer(),
    ],
  })

  function generate(input: Parameters<typeof uno.generate>[0]) {
    return uno.generate(input, { preflights: false })
  }

  test('flex autoprefixer', async () => {
    const { css } = await generate(['flex'])

    expect(css).toMatchSnapshot()
  })

  test('text space', async () => {
    const { css } = await generate(['text-1'])

    expect(css).toMatchSnapshot()
  })

  test('font weight', async () => {
    const { css } = await generate(['font-400', 'font-bold'])

    expect(css).toMatchSnapshot()
  })

  test('background gradient', async () => {
    const { css } = await generate(['bg-gradient-to-tr', 'from-purple-500', 'to-pink-500'])

    expect(css).toMatchSnapshot()
  })

  test('p-x', async () => {
    const { css } = await generate(['px-10'])

    expect(css).toMatchSnapshot()
  })
  test('space-x', async () => {
    const { css } = await generate(['space-x-10'])

    expect(css).toMatchSnapshot()
  })
})
