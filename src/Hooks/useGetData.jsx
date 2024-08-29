import { useQuery } from '@tanstack/react-query'

export default function useGetAllData(key, func) {
    return useQuery ({ 
      queryKey: [key], 
      queryFn: func,
      refetchOnWindowFocus: true,
    })
}

