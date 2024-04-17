export default defineAppConfig({
  ui: {
    primary: 'cyan',
    gray: 'zinc',

    button: {
      base: 'transition',
      font: 'font-semibold',

      color: {
        red: {
          outline: 'hover:bg-red-500 border border-red-500 text-red-500 hover:text-white',
        },
      },

    },

    modal: {
      container: 'items-center',
    },

    icons: {
      dynamic: true,
    },

    slideover: {
      base: 'relative flex-1 flex flex-col w-full !transform focus:outline-none',
    },

    pagination: {
      wrapper: 'flex items-center -space-x-px gap-2',
      base: 'rounded-md size-8 md:size-9 center',
      default: {
        inactiveButton: {
          color: 'white',
        },
        firstButton: {
          class: 'rtl:[&_span:first-child]:rotate-180 hidden',
          icon: 'i-heroicons-chevron-double-left-20-solid',
        },
        lastButton: {
          class: 'rtl:[&_span:last-child]:rotate-180 hidden',
          icon: 'i-heroicons-chevron-double-right-20-solid',
        },
        prevButton: {
          class: 'rtl:[&_span:first-child]:rotate-180',
          icon: 'i-heroicons-chevron-left-20-solid',
        },
        nextButton: {
          class: 'rtl:[&_span:last-child]:rotate-180',
          icon: 'i-heroicons-chevron-right-20-solid',
        },
      },
    },

  },

})
