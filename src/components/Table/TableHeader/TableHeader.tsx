// Made enums for the sort categories which can be extended
// should the need arise in the future
export enum SortCategory {
  Name = "name",
  Date = "date",
  Type = "type",
  Size = "size",
}

// Made enums for the sorting directions which can be extended
export interface Columns {
  title: string;
  sortCategory: SortCategory;
}

interface TableHeaderProps {
  handleSortChange: (category: SortCategory) => void;
  columns: Columns[];
}

/**
 *
 * @param columns header titles array
 * @param handleSortChange sort change method to be called for state change
 * @returns JSX for the input and sort elements
 */
const TableHeader: React.FC<TableHeaderProps> = ({
  handleSortChange,
  columns,
}: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.title}
            className="px-2 font-normal cursor-pointer hover:bg-gray-200 [&:not(:last-child)]:border-r"
            onClick={() => handleSortChange(column.sortCategory)}
          >
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
