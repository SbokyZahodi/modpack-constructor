export default () => {
  const project = useState<IMod | null>('mod-versions-modal', () => null)

  function showProjectVersions(projectId: IMod) {
    project.value = projectId
  }

  return {
    project,
    showProjectVersions,
  }
}
