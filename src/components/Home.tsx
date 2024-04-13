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
              "size-16  items-center justify-center flex flex-col bg-background rounded shadow text-primary"
            }
          >
            <BookCopy className={"size-5"} />
            <span className={"text-xs mt-2"}>K.G</span>
          </div>
          <div className={"flex flex-col ml-4"}>
            <span className={"text-xl "}>Knowledge</span>
            <span className={"text-sm"}>Garden</span>
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
            “Knowledge garden (K.G) is an library management software.”
          </p>
          <footer className="text-sm">Reducer</footer>
        </blockquote>
      </div>
    </div>
  );
};
export default Home;
