import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	Input,
	Text,
	FormLabel,
	useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object({
	categoryName: yup.string().required("Campo obrigatório").min(3),
});

export function RegisterCategoryDrawer() {
	const textColor = useColorModeValue("black", "white");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => console.log(data);

	return (
		<>
			<Text fontSize="sm" fontWeight="400" onClick={onOpen}>
				Categoria
			</Text>
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<DrawerCloseButton />
						<DrawerHeader>Adicionar Categoria</DrawerHeader>

						<DrawerBody>
							<FormLabel htmlFor="category">Categoria</FormLabel>
							<Input
								id="categoryName"
								placeholder="Insira uma categoria..."
								color={textColor}
								{...register("categoryName")}
							/>
							<Text color="tomato">
								{errors.categoryName?.message}
							</Text>
						</DrawerBody>

						<DrawerFooter>
							<Button variant="outline" mr={3} onClick={onClose}>
								Cancelar
							</Button>
							<Button type="submit" colorScheme="blue">
								Cadastrar
							</Button>
						</DrawerFooter>
					</form>
				</DrawerContent>
			</Drawer>
		</>
	);
}
