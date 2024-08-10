// Declare default multi-api resolver interface
export interface IResolver<Payload, Response> {
  CurseForge: (data: Payload) => Promise<Response>
  Modrinth: (data: Payload) => Promise<Response>
}
