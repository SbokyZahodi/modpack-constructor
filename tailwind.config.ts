import colors from 'tailwindcss/colors'
import { resolve } from 'pathe'

export default {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      cyan: colors.cyan,
      zinc: colors.zinc,
      green: colors.green,
    },
  },
  // Remove unused components from bundle
  content: {
    files: [
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/data/table.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/elements/alert.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/elements/avatar.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/elements/avatarGroup.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/elements/buttonGroup.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/elements/kbd.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/elements/meter.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/elements/meterGroup.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/forms/radioGroup.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/forms/radio.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/forms/formGroup.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/forms/range.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/layout/divider.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/navigation/commandPalette.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/navigation/verticalNavigation.mjs')}`,
      `!${resolve('node_modules/@nuxt/ui/dist/runtime/ui.config/overlays/contextMenu.mjs')}`,
    ],
  },
}
