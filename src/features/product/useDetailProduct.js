import { axiosInstance } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

export const useDetailProduct = ({ id }) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const res = await axiosInstance.get(`products/${id}`)
      return res
    },
    enabled: !!id,
    queryKey: ['detail.products']
  })

  return {
    data: data,
    isLoading: isLoading
  }
}