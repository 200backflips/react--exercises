import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Cubes from "@/views/errors/cubes";
import Beach from "@/views/errors/beach";
import Fact from "@/views/errors/fact";
import useGetUniversityList from "@/hooks/use-get-university-list";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/errors/")({
  component: ErrorsComponent,
});

const beachProps = {
  imgUrl:
    "https://images.unsplash.com/photo-1771280802038-a975ff12255e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  textContent:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  badgeText: "Look, a beach!",
};

function ErrorsComponent() {
  const { data } = useGetUniversityList("Sweden");

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-8">
        <Cubes />
        <Separator />
        <Beach {...beachProps} />
        <Separator />
        <Fact />
        <div className="grid grid-cols-4 gap-4">
          {data?.slice(0, 5).map(({ name }) => (
            <Card key={name}>
              <CardContent className="flex items-center justify-between">
                <p>{name}</p>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    toast.error("Inget hände, försök inte igen!");
                  }}
                >
                  <TrashIcon />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
