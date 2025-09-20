import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Progress } from "@radix-ui/react-progress";

export default function Home() {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-4">
        <div>
          <Button variant="elevated">
            Hello World
          </Button>
        </div>
        <div >
          
          <Input placeholder="I am an Input" ></Input>
        </div>
        <div >
         <Progress value={33} />
        </div>
        <div >
          <Textarea placeholder="I am an textarea"/>
        </div>
        <div >
          <Checkbox> Hello</Checkbox>
        </div>
      </div>

    </div>


  );
}
