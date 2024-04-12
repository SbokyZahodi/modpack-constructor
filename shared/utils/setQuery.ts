export default (key: string, value: any) => {
  useRouter().push({ query: { ...useRoute().query, [key]: value } })
}
