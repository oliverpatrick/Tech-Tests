import React, { useState } from "react";
import TableBody from "./TableBody/TableBody";
import TableHeader, { SortCategory } from "./TableHeader/TableHeader";
import TableSearch from "./TableSearch/TableSearch";

// table needs to follow SOLID more. Broke down the components but not as much as I would
// like need to break down the methods into helper functions as well

export interface TableRowProps {
  type: string;
  name: string;
  size: string;
  added?: string;
  files?: TableRowProps[];
}

interface TableProps {
  data: TableRowProps[];
}

const columns = [
  {
    title: "Name",
    sortCategory: SortCategory.Name,
  },
  {
    title: "Date",
    sortCategory: SortCategory.Date,
  },
  {
    title: "Type",
    sortCategory: SortCategory.Type,
  },
  {
    title: "Size",
    sortCategory: SortCategory.Size,
  },
];

/**
 *
 * @param data data set for the table defined by TableRowProps[]
 * @returns JSX for the input and sort elements
 */
const Table: React.FC<TableProps> = ({ data }: TableProps) => {
  //input state
  const [searchTerm, setSearchTerm] = useState<string>("");

  //sorting states
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // expandedRow array
  const [expandedRows, setExpandedRow] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (column: string) => {
    if (sortBy === column) {
      // Toggle sort order if the same column is clicked again
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleSubRowToggle = (fileName: string) => {
    if (expandedRows.includes(fileName)) {
      setExpandedRow((prev) => prev.filter((name) => name !== fileName));
    } else {
      setExpandedRow((prev) => [...prev, fileName]);
    }
  };

  // Filter the data based on the search term
  const filteredData = data.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (file.files &&
        file.files.some((subFile) =>
          subFile.name.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortBy === "name") {
      const aValue = a.name.toLowerCase();
      const bValue = b.name.toLowerCase();
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (sortBy === "date") {
      const aValue = new Date(a.added!).getTime();
      const bValue = new Date(b.added!).getTime();
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else if (sortBy === "type") {
      const aValue = a.type.toLowerCase();
      const bValue = b.type.toLowerCase();
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (sortBy === "size") {
      const aValue = parseInt(a.size);
      const bValue = parseInt(b.size);
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return 0;
    }
  });

  return (
    <div className="max-w-5xl p-4">
      <TableSearch
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <table className="border-collapse w-full text-left text-base">
        <TableHeader handleSortChange={handleSortChange} columns={columns} />
        <TableBody
          data={sortedData}
          expandedRows={expandedRows}
          handleSubRowToggle={handleSubRowToggle}
        />
      </table>
    </div>
  );
};

export default Table;
