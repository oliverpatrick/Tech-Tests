import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TableBody from "./TableBody";

// these tests were quickly scraped up and i would like to
// go more in depth adding testing for the ternary operation of files
// within the folder however i've ran over the 3 hour mark doing
// the logic for the table. Ideally i would of used a table library to display
// the data to save time but decided to code it up from scratch

const data = [
  {
    name: "Folder 1",
    added: "2021-05-01T00:00:00Z",
    type: "folder",
    size: "",
    files: [
      {
        name: "File 1",
        added: "2021-05-01T00:00:00Z",
        type: "pdf",
        size: "10 KB",
      },
    ],
  },
  {
    name: "Folder 2",
    added: "2021-05-01T12:34:56Z",
    type: "folder",
    size: "",
    files: [
      {
        name: "File 2",
        added: "2021-05-02T12:34:56Z",
        type: "doc",
        size: "20 KB",
      },
      {
        name: "File 3",
        added: "2021-05-02T12:34:56Z",
        type: "jpg",
        size: "30 KB",
      },
    ],
  },
  {
    name: "Folder 3",
    added: "1/5/2022",
    type: "folder",
    size: "",
  },
];

const handleSubRowToggle = jest.fn();

describe("TableBody", () => {
  it.each([
    [[], 3, ["Folder 1 1 files", "Folder 2 2 files", "Folder 3"]],
    [
      ["Folder 1"],
      4,
      ["Folder 1 1 files", "File 1", "Folder 2 2 files", "Folder 3"],
    ],
    [
      ["Folder 1", "Folder 2"],
      6,
      ["Folder 1 1 files", "File 1", "Folder 2 2 files", "File 2", "File 3"],
    ],
  ])(
    "should render the table rows with the correct data",
    (expandedRows, numberOfRows, rowNames) => {
      render(
        <table>
          <TableBody
            data={data}
            expandedRows={expandedRows}
            handleSubRowToggle={handleSubRowToggle}
          />
        </table>
      );

      const tableRows = screen.getAllByRole("row");
      expect(tableRows).toHaveLength(numberOfRows);

      rowNames.forEach((name) => {
        let rowName = screen.getByText(name);
        expect(rowName).toBeInTheDocument();
      });
    }
  );

  it("should toggle subrows when folder is clicked", () => {
    const handleSubRowToggle = jest.fn();
    render(
      <table>
        <TableBody
          data={data}
          expandedRows={[]}
          handleSubRowToggle={handleSubRowToggle}
        />
      </table>
    );

    const folder1 = screen.getByText("Folder 1 1 files");
    fireEvent.click(folder1);
    expect(handleSubRowToggle).toHaveBeenCalledWith("Folder 1");

    const folder2 = screen.getByText("Folder 2 2 files");
    fireEvent.click(folder2);
    expect(handleSubRowToggle).toHaveBeenCalledWith("Folder 2");
  });
});
