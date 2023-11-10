/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDetailProduct, useUpdateProduct, useFetchProducts } from '@/features/product'
import { useFormik } from 'formik'
import {
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast
} from '@chakra-ui/react'

function ProductEditContainer() {
  const router = useRouter()
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      price: '',
      description: '',
      image: ''
    },
    onSubmit: () => {
      const { name, price, description, image, id } = formik.values
      updateProduct({
        id,
        name,
        price: Number(price),
        description,
        image
      })
      formik.resetForm()
    }
  })
  const { data: detailProductData } = useDetailProduct({
    id: router?.query?.id
  })
  const { mutate: updateProduct, isLoading: updateLoading } = useUpdateProduct({
    onSuccess: () => {
      toast({
        title: 'Product Updated',
        status: 'success',
        position: 'top-right'
      })
      router.push('/products')
    }
  })

  const handleChange = (event) => {
    formik.setFieldValue(event.target.name, event.target.value)
  }

  useEffect(() => {
    if (detailProductData) {
      formik.setFieldValue('id', detailProductData?.data?.id)
      formik.setFieldValue('name', detailProductData?.data?.name)
      formik.setFieldValue('price', detailProductData?.data?.price)
      formik.setFieldValue('description', detailProductData?.data?.description)
      formik.setFieldValue('image', detailProductData?.data?.image)
    }
  }, [detailProductData])

  return (
    <Container>
      <Heading mb='3'>Edit Product</Heading>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing='4' mb='3'>
          <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name='name' onChange={handleChange} value={formik.values.name}/>
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input name='price' onChange={handleChange} value={formik.values.price}/>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input name='description' onChange={handleChange} value={formik.values.description}/>
            </FormControl>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input name='image' onChange={handleChange} value={formik.values.image}/>
            </FormControl>
        </VStack>
        <Button
         type='submit'
         variant='solid'
         colorScheme='teal'
         mr='2'
         >
          Submit
        </Button>
        <Button
         type='button'
         variant='solid'
         colorScheme='red'
         onClick={() => router.back()}
         >
          Cancel
        </Button>
      </form>
    </Container>
  )
}

export default ProductEditContainer