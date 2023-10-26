import { BarChart, ChevronRight } from "lucide-react";

const ParamsPage = () => {
  return (
    <div>
      <div>
        <p className="text-sm font-semibold tracking-tighter">
          Gestion de la BDD
        </p>
        <div className="mt-1.5 rounded-md bg-white p-2 shadow-sm">
          <div className="border-g flex items-center border-b py-1">
            <BarChart className="mr-3 h-4 w-4" /> <span>Statistitques</span>{" "}
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </div>
          <div className="border-g flex items-center border-b py-1">
            <BarChart className="mr-3 h-4 w-4" /> <span>Statistitques</span>{" "}
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </div>
          <div className="border-g flex items-center border-b py-1">
            <BarChart className="mr-3 h-4 w-4" /> <span>Statistitques</span>{" "}
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParamsPage;
