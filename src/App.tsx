import React from "react";
import { data } from "./data/data";
import Table from "./components/Table/Table";

// For the tech test a Table seemed
// like an approach choice as the requirements
// sounded similar to a file explorer window.

// The data json is pulled into app from the data folder
// for easy of use
// (this is only the case because the data is static in this test
//  however normally the data would be pulled in from an api
// and pulled via a react into the component itself or through a HOC
// /Wrapper)

const App: React.FC = () => {
  return (
    <div>
      <Table data={data} />
    </div>
  );
};

export default App;
