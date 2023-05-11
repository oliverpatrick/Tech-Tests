import React from "react";
import { TableRowProps } from "../Table";

interface TableBodyProps {
  data: TableRowProps[];
  expandedRows: string[];
  handleSubRowToggle: (fileName: string) => void;
}

/**
 *
 * @param data data from table container
 * @param expandedRows string[] of expanded rows
 * @param handleSubRowToggle row dropdown method to be called for state change
 * @returns JSX for the input and sort elements
 */
const TableBody: React.FC<TableBodyProps> = ({
  data,
  expandedRows,
  handleSubRowToggle,
}: TableBodyProps) => {
  console.log(expandedRows);
  return (
    <tbody>
      {data.map((row: TableRowProps, index: number) => (
        <React.Fragment key={index}>
          <tr className="hover:bg-gray-200">
            <td
              className={"px-2 font-normal"}
              onClick={() => handleSubRowToggle(row.name)}
            >
              {`${row.name} ${
                row.files && row.files.length ? row.files.length + " files" : ""
              }`}
            </td>
            <td className="px-2 font-normal">{row.added}</td>
            <td className="px-2 font-normal">{row.type}</td>
            <td className="px-2 font-normal">{row.size}</td>
          </tr>
          {expandedRows.includes(row.name) &&
            row.files &&
            row.files.map((subFile: TableRowProps, subIndex: number) => (
              <tr className="hover:bg-gray-200" key={`${index}-${subIndex}`}>
                <td className="px-2 font-normal">{subFile.name}</td>
                <td className="px-2 font-normal">{subFile.added}</td>
                <td className="px-2 font-normal">{subFile.type}</td>
                <td className="px-2 font-normal">{subFile.size}</td>
              </tr>
            ))}
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default TableBody;
