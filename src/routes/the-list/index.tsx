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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import { chunk } from "remeda";
import { universityStore, type AvailableCountries } from "@/lib/zustand-store";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useForm } from "@tanstack/react-form";

export const Route = createFileRoute("/the-list/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { country, name, setCountry, setName } = universityStore();
  const { data } = useGetUniversityList(country, name);

  const universitiesTotal = data?.length ?? 0;
  const pageSize = 20;
  const pagesTotal = Math.ceil(universitiesTotal / pageSize);
  const paginatedData = useMemo(() => chunk(data ?? [], pageSize), [data]);

  const [currentPage, setCurrentPage] = useState(1);

  const form = useForm({
    defaultValues: {
      name,
    },
    onSubmit: async ({ value }) => {
      setName(value.name);
    },
  });

  return (
    <>
      <div className="flex items-center justify-start gap-4">
        <Field>
          <FieldLabel htmlFor="country">Land</FieldLabel>
          <Select
            defaultValue={country}
            onValueChange={(value: AvailableCountries) => {
              form.setFieldValue("name", "");
              setName("");
              setCountry(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="Sweden">Sweden</SelectItem>
                <SelectItem value="Norway">Norway</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <form>
          <Field>
            <FieldLabel htmlFor="name">Namn</FieldLabel>
            <form.Field
              name="name"
              asyncDebounceMs={500}
              children={(field) => (
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={field.state.value}
                  placeholder="Ange namn"
                  className="min-w-48"
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    form.handleSubmit();
                  }}
                />
              )}
            />
          </Field>
        </form>
      </div>
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
          {paginatedData[currentPage - 1]?.map((uni) => (
            <TableRow key={crypto.randomUUID()}>
              <TableCell className="font-semibold">{uni.name}</TableCell>
              <TableCell>{uni.country ?? "-"}</TableCell>
              <TableCell>{uni.alpha_two_code ?? "-"}</TableCell>
              <TableCell>{uni["state-province"] ?? "-"}</TableCell>
              <TableCell>
                {uni.web_pages.map((page, index) => (
                  <Badge variant="secondary" key={crypto.randomUUID()}>
                    <a href={page} about="_blank" rel="noopener noreferrer">
                      {uni.domains[index]}
                    </a>
                  </Badge>
                ))}
              </TableCell>
            </TableRow>
          ))}
          {Array.from({
            length: pageSize - (paginatedData[currentPage - 1]?.length ?? 0),
          }).map(() => (
            <TableRow key={crypto.randomUUID()}>
              <TableCell colSpan={5} className="h-9.75" />
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        if (currentPage !== 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => {
                        if (currentPage === 1) {
                          return;
                        }
                        if (currentPage === pagesTotal && pagesTotal !== 2) {
                          return setCurrentPage(currentPage - 2);
                        }
                        return setCurrentPage(currentPage - 1);
                      }}
                      isActive={currentPage === 1}
                    >
                      {currentPage > 1 &&
                      currentPage === pagesTotal &&
                      pagesTotal !== 2
                        ? currentPage - 2
                        : currentPage > 1
                          ? currentPage - 1
                          : 1}
                    </PaginationLink>
                  </PaginationItem>
                  {pagesTotal !== 2 && pagesTotal > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        isActive={
                          currentPage !== 1 && currentPage !== pagesTotal
                        }
                      >
                        {currentPage == 1
                          ? currentPage + 1
                          : currentPage === pagesTotal
                            ? currentPage - 1
                            : currentPage}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  {pagesTotal > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => {
                          if (currentPage === pagesTotal) {
                            return;
                          }
                          if (currentPage === 1 && pagesTotal !== 2) {
                            return setCurrentPage(currentPage + 2);
                          }
                          return setCurrentPage(currentPage + 1);
                        }}
                        isActive={currentPage === pagesTotal}
                      >
                        {currentPage === 1 && pagesTotal !== 2
                          ? currentPage + 2
                          : currentPage + 1 <= pagesTotal
                            ? currentPage + 1
                            : pagesTotal}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => {
                        if (currentPage !== pagesTotal) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
