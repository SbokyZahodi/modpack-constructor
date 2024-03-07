export default (key: string, value: string | null) => {
  useRouter().push({ query: { ...useRoute().query, [key]: value } })
}
