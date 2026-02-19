import { BirdhouseIcon, BugIcon, SpeechIcon, Table2Icon } from "lucide-react";
import ReduxIcon from "@/assets/redux";
import ZustandIcon from "@/assets/zustand";
import TanstackQueryIcon from "@/assets/tanstack-query";

const sidebarSections = [
    {
        title: "Kontrollpanel",
        items: [
            {
                title: "Startsida",
                path: "/",
                icon: BirdhouseIcon,
                tooltip: "Tillbaka till startsidan",
            },
        ],
    },
    {
        title: "Global state vs. caching",
        items: [
            {
                title: "Zustand",
                path: "/zustand",
                icon: ZustandIcon,
                tooltip: "Globalt state baserat på hooks",
            },
            {
                title: "React Query",
                path: "/react-query",
                icon: TanstackQueryIcon,
                tooltip: "API-anrop och caching",
            },
            {
                title: "Redux",
                path: "/redux",
                icon: ReduxIcon,
                tooltip:
                    "Bonusuppgift: Global state-hantering som också stödjer asynkrona processer",
            },
        ],
    },
    {
        title: "Övrigt",
        items: [
            {
                title: "Speech 2 Text",
                path: "/speech-2-text",
                icon: SpeechIcon,
                tooltip: "Konverterar wav-filer till text",
            },
            {
                title: "The List",
                path: "/the-list?country=India",
                icon: Table2Icon,
                tooltip: "Skapa en tabell med paginering för optimal prestanda",
            },
            {
                title: "Buggar",
                path: "/errors",
                icon: BugIcon,
                tooltip: "Skapa en tabell med paginering för optimal prestanda",
            },
        ],
    },
];


const routeNames: Record<string, string> = {
};

sidebarSections.forEach((section) => {
    section.items.forEach((item) => {
        routeNames[item.path.split('?')[0]] = item.title;
    });
});

export { sidebarSections, routeNames };