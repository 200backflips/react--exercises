import { getUniversityList } from "@/lib/queries";
import type { University } from "@/types/university";
import { useQuery } from "@tanstack/react-query";

const useGetUniversityList = (country: string) =>
  useQuery<University[]>({
    queryKey: ["university"],
    queryFn: () => getUniversityList(country),
  });

export default useGetUniversityList;
