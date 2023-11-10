import { axiosInstance } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

export const useFetchProducts = () => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      const res = await axiosInstance.get('products')
      return res
    },
    queryKey: ['fetch.products']
  })

  return {
    data: data,
    isLoading: isLoading,
    refetch: refetch
  }
}