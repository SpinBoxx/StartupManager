"use client";

import { fetchCustom } from "@/lib/custom-fetch";
import { ChangeEvent, FormEvent } from "react";
import * as XLSX from "xlsx";

interface Props {
  file: { type: string; data: [] };
}

const DisplayTemplateColomn = ({ file }: Props) => {
  const workbook = XLSX.read(file.data, { type: "array" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const raw_data: string[][] = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
  });
  console.log(raw_data);

  //
  const handleCSVInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      reader.readAsBinaryString(event.target.files[0]);
      reader.onload = async (e) => {
        const data = e.target?.result;
        console.log(e.target);
        console.log(data);
        await fetchCustom("/import", {
          method: "POST",
          body: JSON.stringify({
            data,
          }),
        });
      };
    }
  };

  return (
    <div className="mt-4">
      <p>Voici à quoi ressemble le template d'import d'une startup :</p>
      <div className="mt-4">
        <table>
          <thead>
            {raw_data.at(0)?.map((value) => (
              <th key={value} className="border border-dashed px-4 py-2">
                {value}
              </th>
            ))}
          </thead>
          <tbody>
            <tr>
              {raw_data.at(1)?.map((value) => (
                <td key={value} className="border border-dashed px-4 py-2">
                  {value}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <input type="file" accept=".xlsx" onChange={handleCSVInputChange} />
      </div>
    </div>
  );
};

export default DisplayTemplateColomn;
