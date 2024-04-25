import {
  createBooks,
  deleteBook,
  getallBooks,
} from "../Services/Books.service";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, FileX, PenLine } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Books = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={"h-full overflow-y-auto p-5"}>
      <div className={"flex items-center justify-between"}>
        <div className={"text-xl font-medium"}>
          <span>Books</span>
        </div>
        <div>
          <Button className={"ml-3"} onClick={openModal}>
            <CircleCheckBig className={"size-4"} />
            <span className={"ml-2"}>Add Book</span>
          </Button>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead>ISBN Code</TableHead>
              <TableHead>Edition</TableHead>
              <TableHead>Author Id</TableHead>
              <TableHead>Keywords</TableHead>
              <TableHead>&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book, index) => (
              <TableRow key={index}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.edition}</TableCell>
                <TableCell>{book.author_ids}</TableCell>
                <TableCell>{book.keywords}</TableCell>
                <TableCell>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className={"h-8 w-8"}
                  >
                    <PenLine className={"w-4 h-4 text-primary"} />
                  </Button>

                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className={"h-8 w-8 ml-2"}
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    <FileX className={"w-4 h-4 text-red-500"} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AddBook onOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
export default Books;

const AddBook = (onOpen, onClose) => {
  const handleCreate= async()=> {
    
  }
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary">Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>New Book</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" value="" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isbn" className="text-right">
                Isbn No.
              </Label>
              <Input id="isbn" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edition" className="text-right">
                Edition
              </Label>
              <Input id="edition" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author_id" className="text-right">
                Author Id
              </Label>
              <Input id="author_id" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="keywords" className="text-right">
                Keywords
              </Label>
              <Input id="keywords" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
              <Button type="submit" onClick={handleCreate}>Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
