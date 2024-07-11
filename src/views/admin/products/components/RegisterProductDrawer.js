import React, { useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
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
} from "@chakra-ui/react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "api/index";

import ProductContext from "../context/ProductContext";

const schema = yup.object().shape({
	productName: yup
		.string()
		.required("Nome obrigatório")
		.min(3, "Deve ter 3 ou mais letras"),
	category: yup.string().required("Selecione uma categoria!"),
});

export function RegisterProductDrawer() {
	const textColor = useColorModeValue("black", "white");

	const [categories, setCategories] = useState([]);

	const [products, setProducts] = useContext(ProductContext);

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();

	useEffect(() => {
		api.get(`stock/categories/list`)
			.then((response) => {
				setCategories(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		setValue("productName", "");
	}, [isOpen]);

	const onSubmit = (data) => {
		console.log(data);
		api.post("/stock/products/create", {
			name: data.productName,
			categoryId: Number(data.category),
		}).then((response) => {
			const data = response.data;
			console.log(data);
			const categoryFound = categories.find(
				(category) => category.id === data.categoryId
			);
			setProducts((prev) => [
				...prev,
				{
					id: data.id,
					category: categoryFound.name,
					name: data.name,
					balance: 0,
					last_price: 0,
				},
			]);
		});
		onClose();
	};

	return (
		<>
			<Text fontSize="sm" fontWeight="400" onClick={onOpen}>
				Produto
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
						<DrawerHeader>Adicionar Produto</DrawerHeader>
						<DrawerBody>
							<Stack spacing={1}>
								<FormLabel htmlFor="productName">
									Nome do Produto
								</FormLabel>
								<Input
									id="productName"
									placeholder="Insira o produto..."
									color={textColor}
									{...register("productName")}
								/>
								<Text color="tomato">
									{errors.productName?.message}
								</Text>

								<FormLabel htmlFor="category">
									Categoria
								</FormLabel>
								<Select
									id="category"
									defaultValue=""
									{...register("category")}
								>
									{categories.map((category) => (
										<option value={category.id}>
											{category.name}
										</option>
									))}
								</Select>
								<Text color="tomato">
									{errors.category?.message}
								</Text>
							</Stack>
						</DrawerBody>

						<DrawerFooter justifyContent="space-between">
							<Button variant="outline" onClick={onClose}>
								Cancelar
							</Button>
							<Button
								type="submit"
								colorScheme="blue"
								isLoading={isSubmitting}
							>
								Cadastrar
							</Button>
						</DrawerFooter>
					</form>
				</DrawerContent>
			</Drawer>
		</>
	);
}
