import type { Preset } from 'unocss'
import postcss from 'postcss-js'
import autoprefixer from 'autoprefixer'

const prefixer = postcss.sync([autoprefixer])

export default function autoprefixerPreset(): Preset {
  return {
    name: 'unocss-preset-autoprefixer',
    postprocess: (util) => {
      const entries = util.entries

      util.entries = [
        ...entries.filter((item) => item[0].startsWith('--un')),
        ...genEntries(prefixer(Object.fromEntries(entries.filter((item) => !item[0].startsWith('--un'))))),
      ]
    },
  }
}

const hyphenate = (str: string) => str.replace(/(?:^|\B)([A-Z])/g, '-$1').toLowerCase()

function genEntries(obj: Record<string, string[] | string | number>) {
  const res: Array<[string, string | number]> = []

  Object.keys(obj).forEach((key) => {
    const values = obj[key]
    if (Array.isArray(values)) {
      values.forEach((v: string) => {
        res.push([hyphenate(key), v])
      })
    } else if (typeof values === 'string' || typeof values === 'number') {
      res.push([hyphenate(key), values])
    }
  })

  return res
}
