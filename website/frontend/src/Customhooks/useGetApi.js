import { useQuery } from '@tanstack/react-query';

export const useGetApi = (url, key) =>{
    const { 
        data, 
        refetch,
    } = useQuery({
        queryKey: key, 
        queryFn: () => fetch(url)
        .then((res) => res.json(),),
    });

    return [data, refetch]
}