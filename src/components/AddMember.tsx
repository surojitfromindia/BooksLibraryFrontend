import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label.tsx";
import {Separator} from "@/components/ui/separator.tsx";

const AddMember = () => {
  return (
    <div className={"py-2 flex flex-col h-screen"}>
      {/*header*/}
      <div className={"flex justify-between shadow px-5 py-2"}>
        <h1 className={"text-2xl text-primary"}>Add New Member</h1>
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
            <p className={"text-xl"}> Member details </p>
            <div className={"flex items-center"}>
              <Label htmlFor="first_name" className={"w-1/4 text-destructive"}>
                First name*
              </Label>
              <Input
                type="text"
                id="first_name"
                className={" px-2 py-1 border rounded w-1/2"}
              />
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="last_name" className={"w-1/4 text-destructive"}>
                Last name*
              </Label>
              <Input
                type="text"
                id="last_name"
                className={" px-2 py-1 border rounded w-1/2"}
              />
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="dob" className={"w-1/4 text-destructive"}>
                Date of Birth*
              </Label>
              <Input
                type="date"
                id="dob"
                className={" px-2 py-1 border rounded w-1/2"}
              />
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="gender" className={"w-1/4 text-destructive"}>
                Gender *
              </Label>
              <Select>
                <SelectTrigger className="w-1/2" id={"gender"}>
                  <SelectValue placeholder="Select a gener" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                    <SelectItem value="O">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className={"my-6"}/>

          {/*other details section*/}
          <div className={"flex gap-y-6 flex-col max-w-2xl py-5"}>
            <p className={"text-xl"}>Other</p>
            <div className={"flex items-center"}>
              <Label htmlFor="member_type" className={"w-1/4"}>
                Member type
              </Label>
              <Select value={"regular"}>
                <SelectTrigger className="w-1/2" id={"member_type"}>
                  <SelectValue placeholder="Select a member"  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="contact_number" className={"w-1/4"}>
                Contact
              </Label>
             <Input className={"w-1/2"} type="text" id="contact_number" />
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="join_date" className={"w-1/4"}>
                Contact
              </Label>
             <Input className={"w-1/2"} type="date" id="join_date" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
