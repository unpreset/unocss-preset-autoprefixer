import { defineConfig, presetUno } from 'unocss'
import autoprefixerPreset from './src'

// Just for Vscode Extension

export default defineConfig({
  presets: [
    presetUno(),
    autoprefixerPreset(),
  ],
})
