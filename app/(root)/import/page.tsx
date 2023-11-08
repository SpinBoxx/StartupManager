"use client";

import { useState } from "react";

const ImportPage = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleCSVInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvData = e.target.result;
      const jsonData = convertCSVToJson(csvData);
      setJsonData(jsonData);
    };

    reader.readAsText(file);
  };
  return (
    <div>
      <input type="file" accept=".csv" onChange={handleCSVInputChange} />
      <div>
        <a
          href="/templates-import/startup.xlsx"
          download="startup.xlsx"
          type="file"
        >
          {" "}
          Telecharger le template
        </a>
      </div>
      {jsonData ? (
        <div className="json-container">
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      ) : (
        <p>Please select a CSV file.</p>
      )}
    </div>
  );
};

export default ImportPage;
