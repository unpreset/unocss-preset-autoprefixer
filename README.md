# unocss-preset-autoprefixer
> from v0.0.4 this lib use `lightningcss` to generate css prefixer. Before this version, it used `postcss-js`  

[![npm version](https://badge.fury.io/js/unocss-preset-autoprefixer.svg)](https://badge.fury.io/js/unocss-preset-autoprefixer)

## Installation

```bash
pnpm add lightningcss browserslist -D
```

```ts
import presetUno from '@unocss/preset-uno'
import presetAutoprefixer from 'unocss-preset-autoprefixer'

Unocss({
  presets: [
    presetUno(),
    presetAutoprefixer()
  ],
})
```

## License

MIT
