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

    notifications: {
      position: 'bottom-0',
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
      base: 'rounded-md size-9 center',
      rounded: 'first:rounded-s-md last:rounded-e-md',
      default: {
        size: 'sm',
        activeButton: {
          color: 'primary',
        },
        inactiveButton: {
          color: 'white',
        },
        firstButton: {
          color: 'white',
          class: 'rtl:[&_span:first-child]:rotate-180 hidden',
          icon: 'i-heroicons-chevron-double-left-20-solid',
        },
        lastButton: {
          color: 'white',
          class: 'rtl:[&_span:last-child]:rotate-180 hidden',
          icon: 'i-heroicons-chevron-double-right-20-solid',
        },
        prevButton: {
          color: 'white',
          class: 'rtl:[&_span:first-child]:rotate-180',
          icon: 'i-heroicons-chevron-left-20-solid',
        },
        nextButton: {
          color: 'white',
          class: 'rtl:[&_span:last-child]:rotate-180',
          icon: 'i-heroicons-chevron-right-20-solid',
        },
      },
    },

  },

})
