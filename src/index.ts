import type { Preset } from 'unocss'
import { Buffer } from 'node:buffer'
import process from 'node:process'
import browserslist from 'browserslist'
import { browserslistToTargets, transformStyleAttribute } from 'lightningcss'

export default function autoprefixerPreset(queries: string[] = [
  '>= 0.25%',
  'last 2 versions',
  'not dead',
  'not ie <= 11',
  'Android >= 4.0',
  'iOS >= 8',
]): Preset {
  const targets = browserslistToTargets(browserslist(queries))

  return {
    name: 'unocss-preset-autoprefixer',
    postprocess: (util) => {
      if (process.argv0?.endsWith('Code Helper (Plugin)'))
        return

      const entries = util.entries
      const { code } = transformStyleAttribute({
        code: Buffer.from(entries.filter(item => !item[0].startsWith('--un')).map(x => x.join(':')).join(';')),
        targets,
        minify: true,
      })

      util.entries = [
        ...entries.filter(item => item[0].startsWith('--un')),
        ...code.toString() ? code.toString().split(';').map(i => i.split(':')) as [string, string | number][] : [],
      ]
    },
  }
}
