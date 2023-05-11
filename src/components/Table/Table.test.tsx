import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table";

const testData = [
  {
    type: "folder",
    name: "Employee Handbook",
    added: "2017-01-06",
    size: "1 MB",
  },
  {
    type: "folder",
    name: "Public Holiday policy",
    added: "2016-12-06",
    size: "230 KB",
  },
  {
    type: "folder",
    name: "Expenses",
    size: "350 KB",
    files: [
      {
        type: "doc",
        name: "Expenses claim form",
        added: "2017-05-02",
        size: "250 KB",
      },
      {
        type: "doc",
        name: "Fuel allowances",
        added: "2017-05-03",
        size: "100 KB",
      },
    ],
  },
];

describe("Table component", () => {
  it("renders a table with data", () => {
    render(<Table data={testData} />);

    // Check that the table headers are present
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Size")).toBeInTheDocument();

    // Check that the table rows are present
    expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
    expect(screen.getByText("Public Holiday policy")).toBeInTheDocument();
  });

  it("filters data based on search term", () => {
    render(<Table data={testData} />);

    // Type "employee" into the search input
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "employee" } });

    // Check that only the matching rows are visible
    expect(screen.getByText("Employee Handbook")).toBeInTheDocument();

    expect(screen.queryByText("Public Holiday policy")).toBeNull();
    expect(screen.queryByText("Expenses")).toBeNull();
  });

  it("sorts data based on column", () => {
    render(<Table data={testData} />);

    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader);
    fireEvent.click(nameHeader);

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Public Holiday policy");
    expect(rows[2]).toHaveTextContent("Expenses");
    expect(rows[3]).toHaveTextContent("Employee");
  });

  it("expands sub-rows when clicked", () => {
    render(<Table data={testData} />);

    // Click the "Expenses" row to expand it
    const expensesRow = screen.getByText("Expenses 2 files");
    fireEvent.click(expensesRow);

    expect(screen.getByText("Expenses claim form")).toBeInTheDocument();

    fireEvent.click(expensesRow);

    expect(screen.queryByText("Expenses claim form")).toBeNull();
  });
});
