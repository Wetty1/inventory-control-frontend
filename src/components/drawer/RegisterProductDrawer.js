import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
  Stack,
  FormLabel,
  Input,
  Select,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
  productName: yup.string().required('Nome obrigatório').min(3, 'Deve ter 3 ou mais letras'),
  category: yup.string().required('Selecione uma categoria!'),
})


export function RegisterProductDrawer() {
  const textColor = useColorModeValue("black", "white");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema)
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const onSubmit = (data) => {
    console.log(data)
  }
  
  return (
    <>
      <Text fontSize="sm" fontWeight="400" onClick={onOpen}>
        Produto
      </Text>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerCloseButton />
          <DrawerHeader>Adicionar Produto</DrawerHeader>
          <DrawerBody>
            <Stack spacing={1}>
              <FormLabel htmlFor="productName">Nome do Produto</FormLabel>
              <Input
                id='productName'
                placeholder="Insira o produto..."
                color={textColor}
                {...register('productName')}
              />
              <Text color='tomato'>{errors.productName?.message}</Text>

              <FormLabel htmlFor="category">Categoria</FormLabel>
              <Select id="category" defaultValue="" {...register('category')}>
                <option value=""></option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Text color='tomato'>{errors.category?.message}</Text>
            </Stack>
          </DrawerBody>

          <DrawerFooter justifyContent='space-between'>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
              Cadastrar
            </Button>
          </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}
