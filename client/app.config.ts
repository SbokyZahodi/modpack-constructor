export default defineAppConfig({
  ui: {
    primary: 'cyan',
    gray: 'zinc',

    button: {
      base: 'transition',
      font: 'font-semibold',

      default: {
        loadingIcon: 'mingcute:loading-fill',
      },

      color: {
        red: {
          outline: 'hover:bg-red-500 border border-red-500 text-red-500 hover:text-white',
        },
      },

    },

    notifications: {
      // Show toasts at the top right of the screen
      position: 'bottom-0 end-0 h-fit w-full',
      // container: 'center',
    },

    notification: {
      default: {
        timeout: 3000,
      },
    },

    tabs: {
      list: {
        marker: {
          wrapper: 'duration-300',
        },
      },
    },

    modal: {
      container: 'items-center',
      transition: {
        enter: 'ease-out duration-300',
        enterFrom: 'opacity-0 sm:scale-50',
        enterTo: 'opacity-100 sm:scale-100',
        leave: 'ease-in duration-300',
        leaveFrom: 'opacity-100 sm:scale-100',
        leaveTo: 'opacity-0 sm:scale-50',
      },
    },

    slideover: {
      base: 'relative flex-1 flex flex-col w-full duration-300 !transform focus:outline-none',
    },

    pagination: {
      wrapper: 'flex items-center -space-x-px gap-2',
      base: 'rounded-md md:min-w-8 center',
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
