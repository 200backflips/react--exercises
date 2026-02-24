import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DecoratedCard from "@/components/decorated-card";
import { BeanIcon, BeanOffIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/syntax/")({
  component: RouteComponent,
});

const textContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const cards = [
  {
    textContent,
    imgSrc: "https://images.unsplash.com/photo-1771754337677-a3c7656aeb2c",
    altText: "Körsbärsblommor",
    badgeText: "Look, a night!",
  },
  {
    textContent,
    imgSrc: "https://images.unsplash.com/photo-1566117997047-d239edea81c0",
    altText: "Gata",
    badgeText: "Look, a street!",
  },
  {
    textContent,
    imgSrc:
      "https://plus.unsplash.com/premium_photo-1693007962882-0671e3867ed6",
    altText: "Tarotkort",
    badgeText: "Look, a witch!",
  },
];

function RouteComponent() {
  const [isCardSectionVisible, setIsCardSectionVisible] = useState(true);
  const [isBeanOn, setIsBeanOn] = useState(false);

  return (
    <>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="toggle-card"
            onCheckedChange={setIsCardSectionVisible}
            checked={isCardSectionVisible}
          />
          <Label htmlFor="toggle-card">Toggla kortens synlighet</Label>
        </div>
        <span className="text-secondary">|</span>
        <div className="flex items-center gap-2">
          <Switch id="toggle-card" onCheckedChange={setIsBeanOn} />
          <Label htmlFor="toggle-card">
            Toggla bönan{" "}
            {isBeanOn ? (
              <BeanIcon className="size-4" />
            ) : (
              <BeanOffIcon className="size-4" />
            )}
          </Label>
        </div>
      </div>
      <img
        src="https://miro.medium.com/v2/resize:fit:1300/format:webp/1*HA-HaqPdOxuvfxwr4eWkaA.jpeg"
        alt="sockerbitar"
        className="rounded-md h-44"
      />
      <p className="italic">
        "Syntactic sugar is a syntax aimed to express the same code command in
        different and mostly better ways, in the same language."
      </p>
      <Separator />
      <div className="flex gap-4 flex-wrap">
        {cards.map((card) => (
          <DecoratedCard
            key={card.altText}
            {...card}
            isVisible={isCardSectionVisible}
          />
        ))}
      </div>
    </>
  );
}
