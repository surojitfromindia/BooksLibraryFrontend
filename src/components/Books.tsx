import { Button } from "@/components/ui/button";
import {
  CirclePlus,
  Package,
  PackageCheck,
  PackageMinus,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Link } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import { getAllBooks, updateStock } from "@/Services/Books.service";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";

const Books = () => {
  const [books, setBooks] = useState([]);

  const stockRef = useRef(null);
  useEffect(() => {
    const loadBooks = async () => {
      const data = await getAllBooks();
      setBooks([...data]);
    };
    loadBooks();
  }, []);

  const handleUpdateStock = async (bookId) => {
    const newStock = stockRef.current.value;
    // Update stock
    const updatedItem = await updateStock(bookId, newStock);
    // Update UI
    const updatedBooks = books.map((book) => {
      if (book._id === bookId) {
        return {
          ...book,
          in_stock: updatedItem.in_stock,
          available_stock: updatedItem.available_stock,
          borrowed_stock: updatedItem.borrowed_stock,
        };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  return (
    <div className={"h-full overflow-y-auto p-5"}>
      <div className={"flex items-center justify-between"}>
        <div className={"text-xl font-medium"}>
          <span>Books</span>
        </div>
        <div>
          <Link to={"/app/books/add"}>
            <Button className={"ml-3"}>
              <CirclePlus className={"size-4"} />
              <span className={"ml-2"}>Add Book</span>
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead>ISBN Code</TableHead>
              <TableHead>Edition</TableHead>
              <TableHead>Authors</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book, index) => (
              <TableRow key={index}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.edition}</TableCell>
                <TableCell>
                  {book.author_list
                    .map((auth) => `${auth.first_name} ${auth.last_name}`)
                    .join(", ")}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <div className={"flex space-x-2 cursor-pointer"}>
                        <div className={"flex items-center w-12"}>
                          <Package className={"w-4 h-4 text-green-500"} />
                          <span className={"ml-1.5"}>{book.in_stock ?? 0}</span>
                        </div>{" "}
                        <div className={"flex items-center w-12"}>
                          <PackageCheck className={"w-4 h-4 text-blue-500"} />
                          <span className={"ml-1.5"}>
                            {book.available_stock ?? 0}
                          </span>
                        </div>{" "}
                        <div className={"flex items-center w-12"}>
                          <PackageMinus className={"w-4 h-4 text-red-500"} />
                          <span className={"ml-1.5"}>
                            {book.borrowed_stock ?? 0}
                          </span>
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className={"flex flex-col"}>
                        <div
                          className={"flex items-center justify-between w-full"}
                        >
                          <Label>Total stock</Label>
                          <Input
                            placeholder={"In Stock"}
                            className={"w-32"}
                            defaultValue={book.in_stock ?? 0}
                            ref={stockRef}
                          />
                        </div>
                        <Button
                          className={"mt-3"}
                          onClick={() => handleUpdateStock(book._id)}
                        >
                          Update
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell className={"flex justify-end"}>
                  <Link to={`/app/books/edit/${book._id}`}>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className={"h-8 w-8"}
                    >
                      <Pencil className={"w-4 h-4 text-green-500"} />
                    </Button>
                  </Link>
                  {/*<Button*/}
                  {/*  size={"icon"}*/}
                  {/*  variant={"outline"}*/}
                  {/*  className={"h-8 w-8 ml-2"}*/}
                  {/*>*/}
                  {/*  <Eye className={"w-4 h-4 text-blue-500"} />*/}
                  {/*</Button>*/}

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
export default Books;
