import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Vertex content')
    .items(
      S.documentTypeListItems().filter(
        (item) => !['module', 'learningOutcome', 'resource'].includes(item.getId() ?? ''),
      ),
    )
