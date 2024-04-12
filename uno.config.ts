// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS options

  shortcuts: [
    { center: 'flex justify-center items-center' },
    [/^gridy-(\d+)$/, ([, minSize]) => `grid grid-cols-[repeat(auto-fit,minmax(${minSize}px,1fr))]`],
  ],

})
