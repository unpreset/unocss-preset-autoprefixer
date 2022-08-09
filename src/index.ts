import type { Preset } from 'unocss'
import postcss from 'postcss-js'
import autoprefixer from 'autoprefixer'

const prefixer = postcss.sync([autoprefixer])

export default function autoprefixerPreset(): Preset {
  return {
    name: 'unocss-preset-autoprefixer',
    postprocess: (util) => {
      util.entries = genEntries(prefixer(Object.fromEntries(util.entries)))
    },
  }
}

const hyphenate = (str: string) => str.replace(/(?:^|\B)([A-Z])/g, '-$1').toLowerCase()

function genEntries(obj: Record<string, string[] | string>) {
  const res: Array<[string, string]> = []

  Object.keys(obj).forEach((key) => {
    const values = obj[key]
    if (Array.isArray(values)) {
     values.forEach((v: string) => {
        res.push([hyphenate(key), v])
      })
    } else if (typeof values === 'string') {
      res.push([hyphenate(key), values])
    }
  })

  return res
}
