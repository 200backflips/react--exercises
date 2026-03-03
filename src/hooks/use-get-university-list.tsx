import { getUniversityList } from "@/lib/queries";
import type { University } from "@/types/university";
import { useQuery } from "@tanstack/react-query";

const useGetUniversityList = (country: string, name?: string) =>
  useQuery<University[]>({
    queryKey: ["university", country, name],
    queryFn: () => getUniversityList(country, name),
  });

export default useGetUniversityList;
