import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { fetchCustom } from "@/lib/custom-fetch";
import { fileToBase64 } from "@/lib/utils";
import { Download } from "lucide-react";

import fs from "fs-extra";
import DisplayTemplateColomn from "./components/display-template-column";

const ImportPage = async () => {
  // FS ne s'utilise uniquement coté BACKEND
  const file = await fs.readFile("./public/templates-import/startup.xlsx");

  let jsonFile = JSON.stringify(file);

  return (
    <div>
      <Header
        data={{
          title: "Importez vos startups",
          description:
            "Téléchargez le template .xlsx et remplissez le avec vos données puis importez le dans l'input ci-dessous. Toutes les startups seront enregistrées dans la bdd.",
        }}
      />

      <Button className="mt-4 flex items-center">
        <Download className="mr-2 h-4 w-4" />
        Télécharger le template .xlsx
      </Button>

      {/* On parse car on ne peut pas passer un buffer comme prop */}
      <DisplayTemplateColomn file={JSON.parse(jsonFile)} />
    </div>
  );
};

export default ImportPage;
