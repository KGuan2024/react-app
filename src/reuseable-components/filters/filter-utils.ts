import { Filter, SelectedState } from "./FilterTree";

export function navToNode(indexPath: number[], data: Filter[]) {
  let nodeToFind: Filter | undefined;
  let currentNode = data;
  indexPath.forEach((index) => {
    const nodeNavvedTo = currentNode[index];
    nodeToFind = nodeNavvedTo;
    currentNode = nodeNavvedTo?.children || [];
  });
  return nodeToFind;
}

export function updateSelectedFilters(
  filters: Filter[],
  index: number,
  parentIndexPath: number[] = []
) {
  const filterToUpdate = navToNode(parentIndexPath.concat(index), filters);
  if (!filterToUpdate) {
    return;
  }
  const updatedSelectedState = getToggledSelectedState(filterToUpdate);
  filterToUpdate.selectedState = updatedSelectedState;
  if (hasChildren(filterToUpdate)) {
    updateChildren(filterToUpdate, updatedSelectedState as SelectedState);
  }

  updateParents(parentIndexPath, filters);
}

export function getToggledSelectedState(node: Filter) {
  const selectedState = node.selectedState;
  if (hasChildren(node)) {
    const updatedSelectedState =
      selectedState === SelectedState.None || !selectedState
        ? SelectedState.All
        : SelectedState.None;

    return updatedSelectedState;
  } else {
    return !node.selectedState;
  }
}

export function updateChildren(node: Filter, state: SelectedState) {
  if (!hasChildren(node)) {
    return;
  }
  const selected = state !== SelectedState.None;
  node.children?.forEach((node) => {
    node.selectedState = hasChildren(node) ? state : selected;
    updateChildren(node, state);
  });
}

export function updateParents(indexPath: number[], data: Filter[]) {
  // we need to go in reverse order, e.g. if path = [0, 1, 2] we need to update 0,1,2, then 0,1, then 0
  // copy it so that the path does not mutate
  const pathCopy = [...indexPath];
  for (let i = pathCopy.length; i--; ) {
    const node = navToNode(pathCopy, data);
    if (!node) {
      return;
    }
    const selectedState = getSelectedState(node);
    if (node.selectedState !== selectedState) {
      node.selectedState = selectedState;
    }
    pathCopy.pop(); // remove the last item from the array
  }
}

export function getSelectedState(node: Filter) {
  const noChildrenSelected = node.children?.every((c: any) => {
    return (
      (!hasChildren(c) && !c.selectedState) ||
      (hasChildren(c) &&
        (c.selectedState === SelectedState.None || !c.selectedState))
    );
  });
  const allChildrenSelected = node.children?.every(
    (c: Filter) =>
      (!hasChildren(c) && (c.selectedState as boolean)) ||
      (hasChildren(c) && c.selectedState === SelectedState.All)
  );
  if (noChildrenSelected) {
    return SelectedState.None;
  } else if (allChildrenSelected) {
    return SelectedState.All;
  } else {
    return SelectedState.Some;
  }
}

export function hasChildren(node: Filter): boolean {
  return !!(node.children && node.children.length > 0);
}
