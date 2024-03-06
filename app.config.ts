export default defineAppConfig({
  ui: {
    primary: 'cyan',
    gray: 'zinc',

    button: {
      base: 'transition',
    },

    icons: {
      dynamic: true,
    },

    slideover: {
      wrapper: 'fixed inset-0 transition transform flex z-50',
      overlay: {
        base: 'fixed inset-0 transition-opacity',
        background: 'bg-gray-200/75 dark:bg-gray-800/75',
        transition: {
          enter: 'ease-in-out duration-500',
          enterFrom: 'opacity-0',
          enterTo: 'opacity-100',
          leave: 'ease-in-out duration-500',
          leaveFrom: 'opacity-100',
          leaveTo: 'opacity-0',
        },
      },
      base: 'relative flex-1 flex flex-col w-full !transform focus:outline-none',
      background: 'bg-white dark:bg-gray-900',
      ring: '',
      rounded: '',
      padding: '',
      shadow: 'shadow-xl',
      width: 'w-screen max-w-md',
      translate: {
        base: 'translate-x-0',
        left: '-translate-x-full rtl:translate-x-full',
        right: 'translate-x-full rtl:-translate-x-full',
      },
      transition: {
        enter: 'transform transition ease-in-out duration-300',
        leave: 'transform transition ease-in-out duration-200',
      },
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
