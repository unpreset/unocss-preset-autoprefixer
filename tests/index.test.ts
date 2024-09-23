import presetUno from '@unocss/preset-uno'
import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
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

  it('flex autoprefixer', async () => {
    const { css } = await generate(['flex'])

    expect(css).toMatchSnapshot()
  })

  it('text space', async () => {
    const { css } = await generate(['text-1'])

    expect(css).toMatchSnapshot()
  })

  it('font weight', async () => {
    const { css } = await generate(['font-400', 'font-bold'])

    expect(css).toMatchSnapshot()
  })

  it('background gradient', async () => {
    const { css } = await generate(['bg-gradient-to-tr', 'from-purple-500', 'to-pink-500'])

    expect(css).toMatchSnapshot()
  })

  it('p-x', async () => {
    const { css } = await generate(['px-10'])

    expect(css).toMatchSnapshot()
  })
  it('space-x', async () => {
    const { css } = await generate(['space-x-10'])

    expect(css).toMatchSnapshot()
  })
})
