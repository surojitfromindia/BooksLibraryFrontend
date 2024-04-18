import { BookCopy } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className={
        "fixed inset-0 flex flex-col p-10 bg-primary text-primary-foreground"
      }
    >
      <div className={"flex items-center justify-between"}>
        <div className={"flex items-baseline h-fit"}>
          <div
            className={
              "h-28 w-32 bg-background rounded shadow text-primary"
            }
          >
            <BookCopy className={"size-10"}/>
            <span className={"text-xs mt-2 h-10 w-5"}>Knowledge is the most Powerful Tool</span>
          </div>
          <div className={"flex flex-col ml-4"}>
          <span className={"text-xl"}>Knowledge Hub</span>
          </div>
        </div>

        <div>
          {/*on this button click goes to the authors page as it is a link to the authors page*/}
          <Link to={"/app/authors"}>
            <Button variant={"secondary"} className={"uppercase text-xs"}>
              Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className={"grow flex flex-col justify-end"}>
        <blockquote className="space-y-2">
          <p className="text-lg">
            “Knowledge Hub(K.H) is a Library Management Software.”
          </p>
          <footer className="text-sm">Reducer</footer>
        </blockquote>
      </div>
    </div>
  );
};
export default Home;
