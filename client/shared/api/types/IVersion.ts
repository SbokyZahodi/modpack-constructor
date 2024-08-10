export interface IVersion {
  id: string | number
  modId: string | number
  name: string
  file: {
    url: string
    length: number
  }
  dependencies: { id: string | number, required: boolean }[]
}
