export default () => {
  navigator.clipboard.writeText(window.location.href)
  useToast().add({ title: 'Link copied', icon: 'ic:baseline-content-copy' })
}
