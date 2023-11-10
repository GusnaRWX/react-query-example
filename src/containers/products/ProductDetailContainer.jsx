import React from 'react'
import { useRouter } from 'next/router'
import { useDetailProduct } from '@/features/product'
import { Container, Heading, VStack, Box, Flex, Image, Button } from '@chakra-ui/react'

function ProductDetailContainer() {
  const router = useRouter()
  const { data: detailProductData } = useDetailProduct({
    id: router?.query?.id
  })
  return (
    <Container>
      <Heading mb='3'>Detail Product</Heading>
      <VStack spacing='4'>
        <Flex direction='column' alignItems='center' justifyContent='center'>
          <label>Product Name</label>
          <p>{detailProductData?.data?.name}</p>
        </Flex>
        <Flex direction='column' alignItems='center' justifyContent='center'>
          <label>Price</label>
          <p>{detailProductData?.data?.price}</p>
        </Flex>
        <Flex direction='column' alignItems='center' justifyContent='center'>
          <label>Description</label>
          <p>{detailProductData?.data?.description}</p>
        </Flex>
        <Box>
          <Box boxSize='sm'>
            <Image src={detailProductData?.data?.image} alt={detailProductData?.data?.name} />
          </Box>
        </Box>
        <Box>
          <Button colorScheme='teal' onClick={() => router.push('/products')}>Back</Button>
        </Box>
      </VStack>
    </Container>
  )
}

export default ProductDetailContainer