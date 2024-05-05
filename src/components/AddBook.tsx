import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";

import { Separator } from "@/components/ui/separator.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useState, useEffect } from "react";
import { Plus, XCircle } from "lucide-react";

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createBooks, getBookById, updateBook } from "@/Services/Books.service";
import { useNavigate, useParams } from "react-router";
import { useToast } from "@/components/ui/use-toast";
import { getallAuthors } from "@/Services/Authors.service";

const allKeywords = [
  "Adventure",
  "Biography",
  "Business",
  "Children",
  "Classic",
  "Comics",
  "Contemporary",
  "Crime",
  "Fantasy",
  "Fiction",
  "Historical",
  "Horror",
];

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [edition, setEdition] = useState("");
  const [allAuthors, setAllAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const navi = useNavigate();
  const { toast } = useToast();
  const { bookId } = useParams();
  const isEdit = bookId !== undefined;

  const handleSelectAuthor = (author) => {
    setSelectedAuthors([...selectedAuthors, author]);
  };
  const handleSelectKeyword = (kw) => {
    setSelectedKeywords([...selectedKeywords, kw]);
  };
  const handleSave = async () => {
    try {
      const payload = {
        title,
        isbn,
        edition,
        authorIds: selectedAuthors.map((ath) => {
          return ath.value;
        }),
        keyWords: selectedKeywords,
      };

      if (isEdit) {
        await updateBook(bookId, payload);
        toast({
          title: "Success",
          description: "Author is Updated.",
        });
      } else {
        await createBooks(payload);
        toast({
          title: "Success",
          description: "Author is Added.",
        });
      }

      navi("/app/books");
    } catch {
      toast({
        title: "Sorry",
        description: "Operation Failed.",
      });
    }
  };
  const handleCancel = () => {
    navi("/app/books");
  };
  const handleClear = (index: number) => {
    const clearAuthor = selectedAuthors.filter((del, ind) => index !== ind);
    setSelectedAuthors(clearAuthor);
  };
  const handleKeywordClear = (index: number) => {
    const clearKeyword = selectedKeywords.filter((key, ind) => index !== ind);
    setSelectedKeywords(clearKeyword);
  };
  useEffect(() => {
    const loadAuthors = async () => {
      const data = await getallAuthors();
      const mappedAuthors = data.map((author) => {
        return {
          label: `${author.first_name} ${author.last_name}`,
          value: author._id,
        };
      });
      setAllAuthors([...mappedAuthors]);
    };
    loadAuthors();
  }, []);

  useEffect(() => {
    const loadBook = async () => {
      const data = await getBookById(bookId);
      setTitle(data.title);
      setIsbn(data.isbn);
      setEdition(data.edition);
      const authors_mapped = data.author_list.map((author) => ({
        label: `${author.first_name} ${author.last_name}`,
        value: author._id,
      }));
      setSelectedAuthors(authors_mapped);
      setSelectedKeywords(data.keywords);
    };
    if (!isEdit) return;
    loadBook().catch((error) => {
      toast({
        title: "Sorry",
        description: error.message,
      });
      navi("/app/books");
    });
  }, [bookId, isEdit, navi, toast]);

  return (
    <div className={"py-2 flex flex-col h-screen"}>
      {/*header*/}
      <div className={"flex justify-between shadow px-5 py-2"}>
        <h1 className={"text-2xl text-primary"}>
          {isEdit ? "Edit Book" : "Add New Book"}
        </h1>
        <div>
          <Button variant={"outline"} className={"mr-3"} onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>{
            isEdit ? "Update" : "Save"

          }</Button>
        </div>
      </div>

      {/*form body*/}
      <div className={"p-5 overflow-y-scroll grow"}>
        <div>
          {/*book details*/}
          <div className={"flex gap-y-6 flex-col max-w-2xl py-5"}>
            <p className={"text-xl"}> Book details </p>
            <div className={"flex items-center"}>
              <Label htmlFor="title" className={"w-1/4 text-destructive"}>
                Title*
              </Label>
              <Input
                type="text"
                id="title"
                className={"px-2 py-1 border rounded w-1/2"}
                placeholder={"Enter Book title"}
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="isbn" className={"w-1/4 text-destructive"}>
                ISBN*
              </Label>
              <Input
                type="text"
                id="isbn"
                className={"px-2 py-1 border rounded w-1/2"}
                placeholder={"Enter ISBN Code"}
                value={isbn}
                onChange={(ev) => setIsbn(ev.target.value)}
              />
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="edition" className={"w-1/4"}>
                Edition
              </Label>
              <Input
                type="text"
                id="edition"
                className={"px-2 py-1 border rounded w-1/2"}
                placeholder={"Enter Edition"}
                value={edition}
                onChange={(ev) => setEdition(ev.target.value)}
              />
            </div>
          </div>
          <Separator className={"my-6"} />
          {/*other details section*/}
          <div className={"flex gap-y-6 flex-col max-w-2xl py-5"}>
            <p className={"text-xl"}>Others</p>
            <div className={"flex items-baseline "}>
              <Label htmlFor="authors" className={"w-1/4 mt-2"}>
                Author(s)
              </Label>
              {/*list of authors*/}
              <div className={"flex flex-wrap w-3/4 gap-2 items-center"}>
                {selectedAuthors.map((author, index) => (
                  <Badge
                    key={index}
                    variant={"outline"}
                    className={
                      " overflow-hidden flex justify-between p-2 rounded-lg"
                    }
                  >
                    <span className={"text-sm text-gray-600"}>
                      {author.label}
                    </span>
                    <span>
                      <XCircle
                        className={
                          "cursor-pointer w-4 h-4 ml-3 text-destructive/30 hover:text-destructive"
                        }
                        onClick={() => {
                          handleClear(index);
                        }}
                      />
                    </span>
                  </Badge>
                ))}
                {/*add more authors button as popup*/}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id={"authors"}
                      variant="outline"
                      size={"sm"}
                      role="combobox"
                    >
                      <Plus className="h-4 w-4 shrink-0 opacity-50" />
                      More
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className={"p-0"} align={"start"}>
                    <Command>
                      <CommandList>
                        <CommandInput placeholder="Search Authors..." />
                        {[...allAuthors].map((author) => (
                          <CommandItem
                            key={author.value}
                            value={author.label}
                            onSelect={() => {
                              handleSelectAuthor(author);
                            }}
                          >
                            {author.label}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className={"flex items-baseline "}>
              <Label htmlFor="keywords" className={"w-1/4 mt-2"}>
                Keyword(s)
              </Label>
              <div className={"flex flex-wrap w-3/4 gap-2 items-center"}>
                {selectedKeywords.map((kw, index) => (
                  <Badge
                    key={index}
                    variant={"outline"}
                    className={"flex justify-between p-2 rounded-lg"}
                  >
                    <span className={"text-sm text-gray-600 flex-1"}>{kw}</span>
                    <span className={"w-4 flex-none"}>
                      <XCircle
                        className={
                          "cursor-pointer w-4 h-4 ml-1 text-destructive/30 hover:text-destructive"
                        }
                        onClick={() => {
                          handleKeywordClear(index);
                        }}
                      />
                    </span>
                  </Badge>
                ))}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id={"keywords"}
                      variant="outline"
                      size={"sm"}
                      role="combobox"
                    >
                      <Plus className="h-4 w-4 shrink-0 opacity-50" />
                      More
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className={"p-0"} align={"start"}>
                    <Command>
                      <CommandList>
                        <CommandInput placeholder="Search keywords..." />
                        {[...allKeywords].map((kw, index) => (
                          <CommandItem
                            key={index}
                            value={kw}
                            onSelect={() => {
                              handleSelectKeyword(kw);
                            }}
                          >
                            {kw}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
