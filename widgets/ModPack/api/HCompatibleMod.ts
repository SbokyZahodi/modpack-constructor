/** Filter mod that compatible with current loader */
export default function compatibleVersion(version: IVersion[], loader: ILoader): IVersion {
  return version.find(v => v.loaders.includes(loader.toLowerCase())) ?? version[0]
}
