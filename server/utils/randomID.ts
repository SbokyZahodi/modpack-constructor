import { randomBytes } from 'node:crypto'

export default function randomID(length: number): string {
  return randomBytes(length).toString('hex').slice(0, length)
}
