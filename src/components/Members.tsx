import { Button } from "@/components/ui/button.tsx";
import {CirclePlus, Pencil} from "lucide-react";
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

const Members = () => {
  const authors = [
    {
      first_name: "John",
      last_name: "Doe",
      email: "randomemail@uu.com",
      member_type: "regular",
    },
    {
      first_name: "Author1",
      last_name: "Last1",
      email: "author1@example.com",
      member_type: "premium",
    },
    {
      first_name: "Author2",
      last_name: "Last2",
      email: "author2@example.com",
      member_type: "regular",
    },
  ];
  return (
    <div className={"h-full overflow-y-auto p-5"}>
      <div className={"flex items-center justify-between"}>
        <div className={"text-xl font-medium"}>
          <span>Members</span>
        </div>
        <div>
          <Link to={"/app/members/add"}>
            <Button className={"ml-3"} onClick={() => {}}>
              <CirclePlus className={"size-4"} />
              <span className={"ml-2"}>New Member</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className={"mt-3"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Member</TableHead>
              <TableHead className={"w-10"}>&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authors.map((author, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {author.first_name}
                </TableCell>
                <TableCell>{author.last_name}</TableCell>
                <TableCell>{author.email}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      "bg-yellow-200 text-yellow-600 hover:bg-yellow-300"
                    }
                  >
                    {author.member_type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link to={"/app/members/edit"}>
                    <Button size={"icon"} variant={"outline"} className={"h-8 w-8"}>
                      <Pencil className={"w-4 h-4 text-primary"}/>
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Members;
