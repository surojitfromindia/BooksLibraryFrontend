import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

const AddMember = () => {
  return (
    <div className={"py-2"}>
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
      <div className={"max-w-2xl p-5"}>
        <div className={"flex gap-y-6 flex-col"}>
          <div className={"w-full flex items-center"}>
            <label htmlFor="first_name" className={"w-1/4 text-destructive"}>
              First name*
            </label>
            <Input
              type="text"
              id="first_name"
              className={" px-2 py-1 border rounded w-1/2"}
            />
          </div>
          <div className={"w-full flex items-center"}>
            <label htmlFor="last_name" className={"w-1/4 text-destructive"}>
              Last name*
            </label>
            <Input
              type="text"
              id="last_name"
              className={" px-2 py-1 border rounded w-1/2"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
