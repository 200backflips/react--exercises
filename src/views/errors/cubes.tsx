import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import {
  BeanIcon,
  BeanOffIcon,
  CandyIcon,
  CandyOffIcon,
  type LucideIcon,
} from "lucide-react";

const initialOrder = ["#ff0088", "#dd00ee", "#9911ff", "#0d63f8"];

interface CubeProps {
  backgroundColor: string;
  icon: LucideIcon;
  name: string;
}

const Cube = ({ backgroundColor, icon: Icon, name }: CubeProps) => (
  <div
    className="size-28 flex flex-col gap-2 p-4 rounded-md text-white"
    style={{ backgroundColor }}
  >
    <Icon />
    <p>{name}</p>
  </div>
);

const data = [
  {
    backgroundColor: initialOrder[0],
    icon: BeanIcon,
    name: "Bean",
  },
  {
    backgroundColor: initialOrder[1],
    icon: BeanOffIcon,
    name: "Bean Off",
  },
  {
    backgroundColor: initialOrder[2],
    icon: CandyIcon,
    name: "Candy",
  },
  {
    backgroundColor: initialOrder[3],
    icon: CandyOffIcon,
    name: "Candy Off",
  },
];

export default function Cubes() {
  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOrder(
        order.toSorted(() => {
          return Math.random() - 0.5;
        }),
      );
    }, 1500);
    return () => clearTimeout(timeout);
  }, [order]);

  return (
    <>
      <h4>Kuber</h4>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 w-fit">
            {order.map((backgroundColor) => (
              <motion.div
                key={backgroundColor}
                layout
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 150,
                }}
                className="size-28 rounded-md"
                style={{ backgroundColor }}
              />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 w-fit">
            {data.map(({ backgroundColor, icon, name }) => (
              <Cube
                key={crypto.randomUUID()}
                backgroundColor={backgroundColor}
                icon={icon}
                name={name}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
