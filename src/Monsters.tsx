import FilterTree from "./reuseable-components/filters/FilterTree";
import { useMonstersFilterStore } from "./stores/filters/monster-filters.store";

function Monsters() {
  const filters = useMonstersFilterStore((state) => state.filters);
  const updateSelectedFilters = useMonstersFilterStore(
    (state) => state.updateSelectedFilters
  );
  const updateExpandedFilters = useMonstersFilterStore(
    (state) => state.updateExpandedFilters
  );

  return (
    <div>
      {FilterTree({
        filters: filters,
        selectFilterHandler: updateSelectedFilters,
        toggleHandler: updateExpandedFilters,
      })}
    </div>
  );
}

export default Monsters;
