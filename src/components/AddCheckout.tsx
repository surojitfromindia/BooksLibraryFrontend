import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";

const AddCheckout = () => {
  const allMembers = [
    {
      label: "John Doe",
      value: "1",
    },

    {
      label: "Jane Doe",
      value: "2",
    },
    {
      label: "Rajesh",
      value: "3",
    },
  ];
  const allBooks = [
    {
      label: "Book 1",
      value: "1",
    },

    {
      label: "Book 2",
      value: "2",
    },
    {
      label: "Book 3",
      value: "3",
    },
  ];

  const [borrowedBooks] = useState([
    {
      book_title: null,
      copies: 1,
      book_id: null,
    },
  ]);

  return (
    <div className={"py-2 flex flex-col h-screen"}>
      {/*header*/}
      <div className={"flex justify-between shadow px-5 py-2"}>
        <h1 className={"text-2xl text-primary"}>New Checkout</h1>
        <div>
          <Button variant={"outline"} className={"mr-3"}>
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </div>

      {/*form body*/}
      <div className={"p-5 overflow-y-scroll grow"}>
        <div>
          {/*member details section*/}
          <div className={"flex gap-y-6 flex-col max-w-2xl py-5"}>
            <div className={"flex items-center"}>
              <Label htmlFor="member" className={"w-1/4 text-destructive"}>
                Member*
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id={"member"}
                    variant="outline"
                    size={"sm"}
                    role="combobox"
                    className={"px-2 py-1 border rounded w-1/2 justify-between"}
                  >
                    {"Select Member"}
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={"p-0"} align={"start"}>
                  <Command>
                    <CommandList>
                      <CommandInput placeholder="Search Authors..." />
                      {[...allMembers].map((member) => (
                        <CommandItem key={member.value} value={member.label}>
                          {member.label}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="issue_date" className={"w-1/4 text-destructive"}>
                Issue date*
              </Label>
              <Input
                type="date"
                id="issue_date"
                className={"px-2 py-1 border rounded w-1/2"}
              />
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="due_date" className={"w-1/4 text-destructive"}>
                Due date*
              </Label>
              <Input
                type="date"
                id="due_date"
                className={"px-2 py-1 border rounded w-1/2"}
              />
              <Badge className={"ml-2 h-9 rounded-md"}>10 Days</Badge>
            </div>
          </div>
          <Separator className={"my-6"} />
          {/*checkout table*/}
          <div className={"flex gap-y-6 flex-col max-w-4xl py-5"}>
            <p className={"text-xl"}>Books borrowed</p>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Name</TableHead>
                    <TableHead>Copies borrowed</TableHead>
                    <TableHead>&nbsp;</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {borrowedBooks.map((book, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id={"member"}
                              variant="outline"
                              size={"sm"}
                              role="combobox"
                              className={
                                "px-2 py-1 border rounded w-full justify-between"
                              }
                            >
                              {book.book_title ?? "Select Book"}
                              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className={"p-0"} align={"start"}>
                            <Command>
                              <CommandList>
                                <CommandInput placeholder="Search Authors..." />
                                {[...allBooks].map((b) => (
                                  <CommandItem key={b.value} value={b.label}>
                                    {b.label}
                                  </CommandItem>
                                ))}
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          className={"px-2 py-1 border rounded w-1/2"}
                          value={book.copies}
                        />
                      </TableCell>
                      <TableCell className={"flex justify-end"}>
                        <Button variant={"outline"} size={"icon"}>
                          <Trash2 className={"w-4 h-4 text-destructive"} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className={"mt-2"}>
                <Button>
                  <Plus className={"w-4 h-4"} />
                  Add More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddCheckout;
