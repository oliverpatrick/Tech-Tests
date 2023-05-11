import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TableHeader, { SortCategory, Columns } from "./TableHeader";

describe("TableHeader", () => {
  const columns: Columns[] = [
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

  //ignore child of div element is rendered under <Table /> component in dev

  test("renders the correct column titles", () => {
    render(<TableHeader handleSortChange={() => {}} columns={columns} />);

    columns.forEach((column) => {
      expect(screen.getByText(column.title)).toBeInTheDocument();
    });
  });

  test("calls handleSortChange with correct category when column header is clicked", () => {
    const handleSortChange = jest.fn();

    render(
      <TableHeader handleSortChange={handleSortChange} columns={columns} />
    );

    fireEvent.click(screen.getByText("Name"));
    expect(handleSortChange).toHaveBeenCalledWith(SortCategory.Name);

    fireEvent.click(screen.getByText("Date"));
    expect(handleSortChange).toHaveBeenCalledWith(SortCategory.Date);

    fireEvent.click(screen.getByText("Type"));
    expect(handleSortChange).toHaveBeenCalledWith(SortCategory.Type);

    fireEvent.click(screen.getByText("Size"));
    expect(handleSortChange).toHaveBeenCalledWith(SortCategory.Size);
  });
});
