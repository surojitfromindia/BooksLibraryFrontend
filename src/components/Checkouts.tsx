import { Button } from "@/components/ui/button.tsx";
import { CirclePlus, Eye, Pencil, Trash2, Undo2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge.tsx";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { getAllCheckouts } from "@/Services/Checkout.service.ts";

const Checkouts = () => {
  const [allCheckouts, setAllCheckouts] = useState([]);

  useEffect(() => {
    const loadCheckouts = async () => {
      const data = await getAllCheckouts();
      setAllCheckouts(data);
    };
    loadCheckouts().catch((err) => console.error(err));
  }, []);

  return (
    <div className={"h-full overflow-y-auto p-5"}>
      <div className={"flex items-center justify-between"}>
        <div className={"text-xl font-medium"}>
          <span>Checkouts</span>
        </div>
        <div>
          <Link to={"/app/checkouts/add"}>
            <Button className={"ml-3"}>
              <CirclePlus className={"size-4"} />
              <span className={"ml-2"}>New Checkout</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className={"mt-3"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Date</TableHead>
              <TableHead>Member name</TableHead>
              <TableHead>Borrowed for</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Has return</TableHead>
              <TableHead>Over day</TableHead>
              <TableHead>&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allCheckouts.map((chk, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {DateTime.fromISO(chk.issue_date).toFormat("dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  {chk.member_details.first_name} {chk.member_details.last_name}
                </TableCell>
                <TableCell>
                  {
                    DateTime.fromISO(chk.due_date).diff(
                      DateTime.fromISO(chk.issue_date),
                      ["days"]
                    ).days
                  }{" "}
                  days
                </TableCell>
                <TableCell>
                  {DateTime.fromISO(chk.due_date).toFormat("dd-MM-yyyy")}
                </TableCell>
                <TableCell>{chk.has_return ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Badge className={"bg-red-200 text-red-600 hover:bg-red-300"}>
                    {DateTime.fromISO(chk.due_date).diffNow([
                      "days",
                      "hours",
                      "minutes",
                    ]).days * -1}
                  </Badge>
                </TableCell>
                <TableCell className={"flex justify-end"}>
                  <Link to={`/app/checkouts/edit/${chk._id}`}>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className={"h-8 w-8"}
                    >
                      <Eye className={"w-4 h-4 text-blue-500"} />
                    </Button>
                  </Link>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className={"h-8 w-8 ml-2"}
                  >
                    <Undo2 className={"w-4 h-4 text-primary"} />
                  </Button>

                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className={"h-8 w-8 ml-2"}
                  >
                    <Trash2 className={"w-4 h-4 text-red-500"} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Checkouts;
