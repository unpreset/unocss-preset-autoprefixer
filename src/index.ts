import type { Preset } from 'unocss'
import postcss from 'postcss-js'
import autoprefixer from 'autoprefixer'

const prefixer = postcss.sync([autoprefixer])

export default function autoprefixerPreset(): Preset {
  return {
    name: 'unocss-preset-autoprefixer',
    postprocess: (util) => {
      util.entries = genEntries(prefixer(Object.fromEntries(util.entries)))
    }
  }
}

const hyphenate = (str: string) => str.replace(/(?:^|\B)([A-Z])/g, '-$1').toLowerCase()

function genEntries(obj: Record<string, any>) {
  const res:Array<[string, string]> = []
  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key])) {
      obj[key].forEach(v => {
        res.push([hyphenate(key), v])
      })
    } else if (typeof obj[key] === 'string') {
      res.push([hyphenate(key), obj[key]])
    }
  })

  return res
}
