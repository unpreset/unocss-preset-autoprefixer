import type { Preset } from 'unocss'
import { transformStyleAttribute, browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'

export default function autoprefixerPreset(targets: string[] = [
  ">= 0.25%",
  "last 2 versions",
  "not dead",
  "not ie <= 11",
  "Android >= 4.0",
  "iOS >= 8"
]): Preset {
  return {
    name: 'unocss-preset-autoprefixer',
    postprocess: (util) => {
      const entries = util.entries
      const { code } = transformStyleAttribute({
        code: Buffer.from(`${entries.filter((item) => !item[0].startsWith('--un')).map(x => x.join(":"))}`),
        targets: browserslistToTargets(browserslist(targets))
      })
      
      util.entries = [
        ...entries.filter((item) => item[0].startsWith('--un')),
        ...code.toString().split(';').map(i => i.split(':').map(j => j.replace(/\s/g, ''))) as [string, string | number][],
      ]
    },
  }
}
