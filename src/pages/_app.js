import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, useEffect } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false // this setting for turn off refetch when window focus
    }
  }
})

export default function App ({ Component, pageProps }) {
  const [isRender, setRender] = useState(false)

  useEffect(() => {
    setRender(true)
  }, [])

  if (!isRender) {
    return null
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
