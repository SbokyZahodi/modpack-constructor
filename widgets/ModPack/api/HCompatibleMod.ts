/** Filter mod that compatible with current modpack configuration */
export default function compatibleVersion(versions: IVersion[], loader: ILoader, game_version: string, project_type: string): IVersion | null {
  if (project_type !== 'mod')
    return versions[0]

  return versions.find(v => v.loaders.includes(loader.toLowerCase()) && v.game_versions.includes(game_version)) ?? null
}
