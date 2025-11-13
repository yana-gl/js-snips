export const isDescendantPath = (parentPath: string, childPath: string) =>
    childPath.startsWith(parentPath + '/');
