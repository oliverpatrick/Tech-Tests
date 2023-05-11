import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableSearch from "./TableSearch";

describe("TableSearch", () => {
  test("renders input element with placeholder", () => {
    const searchTerm = "";
    const handleSearchChange = jest.fn();
    render(
      <TableSearch
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
    );
    const inputElement = screen.getByPlaceholderText("Search...");
    expect(inputElement).toBeInTheDocument();
  });

  test("calls handleSearchChange when input value changes", () => {
    const searchTerm = "";
    const handleSearchChange = jest.fn();
    render(
      <TableSearch
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
    );
    const inputElement = screen.getByPlaceholderText("Search...");
    const inputValue = "test";
    userEvent.type(inputElement, inputValue);
    expect(handleSearchChange).toHaveBeenCalledTimes(inputValue.length);
  });
});
