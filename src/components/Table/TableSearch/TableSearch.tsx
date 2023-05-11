// would add a debounce to this to avoid unnecessary calls to the api
// maybe a memo to limit rendering - needs more research.
//need to add interface with props to remove any tag

/**
 *
 * @param searchTerm search parameter from the input
 * @param handleSearchChange search change method to be called for state change
 * @returns JSX for the input and sort elements
 */
const TableSearch = ({ searchTerm, handleSearchChange }: any) => {
  return (
    <div className="w-full flex justify-end">
      <input
        className="px-2 py-1"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default TableSearch;
