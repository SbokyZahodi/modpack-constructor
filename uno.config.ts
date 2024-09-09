// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS options

  shortcuts: [
    { 'gradient-text': 'bg-gradient-to-r from-cyan-400 to-pink-300 light:from-dark-500 light:to-dark-700 bg-clip-text text-transparent' },
    { center: 'flex justify-center items-center' },
    [/^gridy-(\d+)$/, ([, minSize]) => `grid grid-cols-[repeat(auto-fit,minmax(${minSize}px,1fr))]`],
  ],

})
