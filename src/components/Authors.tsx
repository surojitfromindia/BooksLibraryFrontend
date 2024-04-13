import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";

const Authors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const authors = [
    {
      first_name: "John",
      last_name: "Doe",
      email: "randomemail@uu.com",
    },
    {
      first_name: "Author1",
      last_name: "Last1",
      email: "author1@example.com",
    },
    {
      first_name: "Author2",
      last_name: "Last2",
      email: "author2@example.com",
    },
    {
      first_name: "Author3",
      last_name: "Last3",
      email: "author3@example.com",
    },
    {
      first_name: "Author4",
      last_name: "Last4",
      email: "author4@example.com",
    },
    {
      first_name: "Author5",
      last_name: "Last5",
      email: "author5@example.com",
    },
    {
      first_name: "Author6",
      last_name: "Last6",
      email: "author6@example.com",
    },
    {
      first_name: "Author7",
      last_name: "Last7",
      email: "author7@example.com",
    },
    {
      first_name: "Author8",
      last_name: "Last8",
      email: "author8@example.com",
    },
    {
      first_name: "Author9",
      last_name: "Last9",
      email: "author9@example.com",
    },
    {
      first_name: "Author10",
      last_name: "Last10",
      email: "author10@example.com",
    },
  ];

  return (
    <div className={"h-full overflow-y-auto p-5"}>
      <div className={"flex items-center justify-between"}>
        <div className={"text-xl font-medium"}>
          <span>Authors</span>
        </div>
        <div>
          <Button className={"ml-3"} onClick={openModal}>
            <CirclePlus className={"size-4"} />
            <span className={"ml-2"}>New author</span>
          </Button>
        </div>
      </div>
      <div className={"mt-3"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Email</TableHead>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AddAuthorsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
export default Authors;

export function AddAuthorsModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        // stop the modal from closing when clicking outside
        onPointerDownOutside={(ev) => ev.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add Author</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="first_name" className="text-left">
              First name
            </Label>
            <Input
              id="first_name"
              placeholder="Enter first name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="last_name" className="text-left">
              Last name
            </Label>
            <Input
              id="last_name"
              placeholder="Enter last name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Enter email address"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
