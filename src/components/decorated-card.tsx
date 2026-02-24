import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  textContent: string;
  imgSrc: string;
  badgeText: string;
  altText: string;
  isVisible: boolean;
}

export default function DecoratedCard({
  textContent,
  imgSrc,
  badgeText,
  altText,
  isVisible,
}: Props) {
  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          exit={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          <Card className="w-fit">
            <CardContent className="flex flex-col gap-8">
              <div className="relative max-w-84">
                <Badge variant="secondary" className="absolute top-0 m-2">
                  {badgeText}
                </Badge>
                <img
                  src={imgSrc}
                  alt={altText}
                  className="object-cover aspect-square rounded-md"
                />
              </div>
              <p className="w-[40ch]">{textContent}</p>
            </CardContent>
          </Card>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
