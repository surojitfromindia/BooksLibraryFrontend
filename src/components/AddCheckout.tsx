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
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { getAllBooks } from "@/Services/Books.service.ts";
import { getallMembers } from "@/Services/Members.service.ts";
import { DateTime } from "luxon";
import { createCheckout } from "@/Services/Checkout.service.ts";

const AddCheckout = () => {
  const [allMembers, setAllMembers] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  const [selectedMember, setSelectedMember] = useState(null);
  const [issueDate, setIssueDate] = useState(DateTime.now().toISO());
  const [dueDate, setDueDate] = useState(
    DateTime.now().plus({ days: 7 }).toISO()
  );
  const [borrowedBooks, setBorrowedBooks] = useState([
    {
      book_title: null,
      copies: 1,
      book_id: null,
    },
  ]);

  useEffect(() => {
    const loadAllBooks = async () => {
      try {
        const books = await getAllBooks();
        const books_mapped = books.map((book) => ({
          label: book.title,
          value: book._id,
          available_stock: book.available_stock,
        }));
        setAllBooks(books_mapped);
      } catch (error) {
        console.error(error);
      }
    };
    const loadAllMembers = async () => {
      try {
        const members = await getallMembers();
        const members_mapped = members.map((member) => ({
          label: `${member.first_name} ${member.last_name}`,
          value: member._id,
        }));
        setAllMembers(members_mapped);
      } catch (error) {
        console.error(error);
      }
    };
    loadAllBooks().catch((error) => console.error(error));
    loadAllMembers().catch((error) => console.error(error));
  }, []);

  const handleMemberChange = (m) => {
    setSelectedMember(m);
  };
  const handleIssueDateChange = (e) => {
    setIssueDate(e.target.value);
  };
  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };
  const handleBookChange = (index, book) => {
    const newBooks = [...borrowedBooks];
    newBooks[index] = {
      book_title: book.label,
      copies: 1,
      book_id: book.value,
    };
    setBorrowedBooks(newBooks);
  };
  const handleCopiesChange = (index: number, e) => {
    const newBooks = [...borrowedBooks];
    newBooks[index] = {
      ...newBooks[index],
      copies: e.target.value,
    };
    setBorrowedBooks(newBooks);
  };
  const handleRemoveBook = (index: number) => {
    if (borrowedBooks.length === 1) {
      return;
    }
    const newBooks = borrowedBooks.filter((_, i) => i !== index);
    setBorrowedBooks(newBooks);
  };
  const handleAddMore = () => {
    setBorrowedBooks([
      ...borrowedBooks,
      {
        book_title: null,
        copies: 1,
        book_id: null,
      },
    ]);
  };

  const handleSave = async () => {
    const payload = {
      member_id: selectedMember.value,
      issue_date: issueDate,
      due_date: dueDate,
      book_list: borrowedBooks.map((book) => ({
        book_id: book.book_id,
        copies: book.copies,
      })),
    };
    await createCheckout(payload);
  };

  return (
    <div className={"py-2 flex flex-col h-screen"}>
      {/*header*/}
      <div className={"flex justify-between shadow px-5 py-2"}>
        <h1 className={"text-2xl text-primary"}>New Checkout</h1>
        <div>
          <Button variant={"outline"} className={"mr-3"}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSave();
            }}
          >
            Save
          </Button>
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
                    {selectedMember?.label ?? "Select Member"}
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={"p-0"} align={"start"}>
                  <Command>
                    <CommandList>
                      <CommandInput placeholder="Search members..." />
                      {[...allMembers].map((member) => (
                        <CommandItem
                          key={member.value}
                          value={member.label}
                          onSelect={() => handleMemberChange(member)}
                        >
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
                value={DateTime.fromISO(issueDate).toFormat("yyyy-MM-dd")}
                onChange={handleIssueDateChange}
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
                value={DateTime.fromISO(dueDate).toFormat("yyyy-MM-dd")}
                onChange={handleDueDateChange}
              />
              <Badge variant={"outline"} className={"ml-2 h-9 rounded-md"}>
                {
                  DateTime.fromISO(dueDate)
                    .diff(DateTime.fromISO(issueDate), [
                      "days",
                      "hours",
                      "minutes",
                    ])
                    .toObject().days
                }{" "}
                Days
              </Badge>
            </div>
          </div>
          <Separator className={"my-6"} />
          {/*checkout table*/}
          <div className={"flex gap-y-6 flex-col max-w-4xl py-5"}>
            <p className={"text-xl"}>Books borrowed</p>
            <div>
              <Table className={"table-fixed"}>
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
                                <CommandInput placeholder="Search books..." />
                                {[...allBooks].map((b) => (
                                  <CommandItem
                                    key={b.value}
                                    value={b.label}
                                    onSelect={() => {
                                      handleBookChange(index, b);
                                    }}
                                  >
                                    <div
                                      className={
                                        "flex justify-between items-center w-full h-10"
                                      }
                                    >
                                      {b.label}

                                      <span className={"text-xs text-gray-500"}>
                                        Available stock: {b.available_stock}
                                      </span>
                                    </div>
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
                          onChange={(e) => handleCopiesChange(index, e)}
                        />
                      </TableCell>
                      <TableCell className={"flex justify-end"}>
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          onClick={() => {
                            handleRemoveBook(index);
                          }}
                        >
                          <Trash2 className={"w-4 h-4 text-destructive"} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className={"mt-2"}>
                <Button onClick={handleAddMore} variant={"outline"}>
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
