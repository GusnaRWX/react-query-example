/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {
  Container,
  Heading,
  Table,
  Tr,
  Thead,
  Th,
  Tbody,
  Td,
  Avatar,
  Spinner,
  Button,
  Flex,
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { useFetchProducts, useDeleteProduct } from '@/features/product'
import { useRouter } from 'next/router'

function ProductContainer() {
  const { isLoading: productLoading, data, refetch } = useFetchProducts()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [id, setId] = useState(0)
  const handleEdit = (id) => {
    router.push(`/products/edit/${id}`)
  }

  const handleDetail = (id) => {
    router.push(`/products/detail/${id}`)
  }

  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      refetch()
      setId(0)
      onClose()
      toast({
        title: 'Product Deleted',
        status: 'success'
      })
    }
  })

  const handleConfirmation = (val) => {
    onOpen()
    setId(val)
  }

   const ModalConfimation = () => {
    return (
      <>
       <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure to delete this product ?</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' mr='3' onClick={() => deleteProduct(id)}>Yes, Delete it</Button>
            <Button variant='ghost'>Cancel</Button>
          </ModalFooter>
        </ModalContent>
       </Modal>
      </>
    )
  }

  return (
    <>
    <Container>
      <Heading mb='3'>List Product</Heading>
      <Flex>
        <Button colorScheme='red' size='sm' mr='2' onClick={() => router.push('/')}>Back</Button>
        <Button colorScheme='teal' size='sm' onClick={() => router.push('/products/create')}>Create</Button>
      </Flex>
      <ModalConfimation />
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Description</Th>
            <Th>Image</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            productLoading && (
              <Tr>
                <Spinner />
              </Tr>
            )
          }
          {
            data?.data?.map((item) => (
              <Tr key={item?.id}>
                <Td>{item?.id}</Td>
                <Td>{item?.name}</Td>
                <Td>{item?.price}</Td>
                <Td>{item?.description}</Td>
                <Td>
                  <Avatar src={item?.image} size='md'/>
                </Td>
                <Td>
                  <VStack spacing='2'>
                    <Button colorScheme='teal' onClick={() => handleEdit(item?.id)}>Edit</Button>
                    <Button colorScheme='pink' onClick={() => handleDetail(item?.id)}>Detail</Button>
                    <Button colorScheme='red' onClick={() => handleConfirmation(item?.id)}>Delete</Button>
                  </VStack>
                </Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </Container>

    </>
  )
}

export default ProductContainer