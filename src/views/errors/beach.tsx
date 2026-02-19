import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  textContent: string;
  imgUrl: string;
  badgeText: string;
}

export default function Beach({ textContent, imgUrl, badgeText }: Props) {
  return (
    <>
      <h4>Strandkort</h4>
      <Card className="w-fit">
        <CardContent className="flex flex-col gap-8">
          <div className="relative max-w-84">
            <Badge variant="secondary" className="absolute top-0 m-2">
              {badgeText}
            </Badge>
            <img
              src={imgUrl}
              alt="en strand"
              className="object-cover aspect-square rounded-md"
            />
          </div>
          <p className="w-[40ch]">{textContent}</p>
        </CardContent>
      </Card>
    </>
  );
}
