import useGetUniversityList from "@/hooks/use-get-university-list";
import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

export const Route = createFileRoute("/the-list/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { country } = Route.useSearch();
  const { data } = useGetUniversityList(country);
  const universitiesTotal = data?.length ?? 0;
  const pageSize = 20;
  const totalPages = Math.ceil(universitiesTotal / pageSize);
  // const paginatedList = chunk(data, pageSize);

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Table>
      <TableCaption>
        {data && universitiesTotal > 0 && country
          ? `A list of ${universitiesTotal} universities in ${country}`
          : "Country not found"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Alpha two code</TableHead>
          <TableHead>State province</TableHead>
          <TableHead>Domains</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((uni) => (
          <TableRow key={crypto.randomUUID()}>
            <TableCell className="font-semibold">{uni.name}</TableCell>
            <TableCell>{uni.country ?? "-"}</TableCell>
            <TableCell>{uni.alpha_two_code ?? "-"}</TableCell>
            <TableCell>{uni["state-province"] ?? "-"}</TableCell>
            <TableCell>
              {uni.web_pages.map((page, index) => (
                <Badge variant="secondary">
                  <a
                    key={crypto.randomUUID()}
                    href={page}
                    about="_blank"
                    rel="noopener noreferrer"
                  >
                    {uni.domains[index]}
                  </a>
                </Badge>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive={currentPage === 1}>
                    {currentPage - 1 > 0 ? currentPage - 1 : 1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage !== 1 || currentPage !== totalPages}
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === totalPages}
                  >
                    {currentPage + 1 <= totalPages
                      ? currentPage + 1
                      : totalPages}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
