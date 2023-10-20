import { useQuery } from '@tanstack/react-query';

export const useGetApi = (url) =>{
    const { 
        data, 
        refetch,
    } = useQuery({
        queryKey: ["cat"], 
        queryFn: () => fetch(url)
        .then((res) => res.json(),),
    });

    return [data, refetch]
}