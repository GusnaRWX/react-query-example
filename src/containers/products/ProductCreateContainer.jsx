import React from 'react'
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
import { useFormik } from 'formik'
import { useCreateProduct } from '@/features/product'
import { useRouter } from 'next/router'

function ProductCreateContainer() {
  const router = useRouter()
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      description: '',
      image: ''
    },
    onSubmit: () => {
      const { name, price, description, image } = formik.values
      createProduct({
        name,
        price: Number(price),
        description,
        image
      })
      formik.resetForm()
    }
  })

  const { mutate: createProduct, isLoading: createProductLoading } = useCreateProduct({
    onSuccess: () => {
      toast({
        title: 'Product Added',
        status: 'success',
        position: 'top-right'
      })
      router.push('/products')
    }
  })

  const handleChange = (event) => {
    formik.setFieldValue(event.target.name, event.target.value)
  }

  return (
    <Container>
      <Heading mb='3'>Create Product</Heading>
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

export default ProductCreateContainer