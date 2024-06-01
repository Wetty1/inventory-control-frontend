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
	Select,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { MdAddShoppingCart, MdEdit } from "react-icons/md";
import { PurchaseContext } from "../context/PurchaseContext";

import { v4 as uuidv4 } from "uuid";

import api from "api/index";

const schema = yup.object({
	product: yup.string().required("Selecione um produto"),
	quantity: yup.number().required("Campo obrigatório"),
	unitprice: yup.string().required("Campo obrigatório"),
	total: yup.string().required("Campo obrigatório"),
});

export default function RegisterItemDrawer(props) {
	const { items, setItems, itemSelected } = props;

	const [products, setProducts] = useState([]);

	const [productIdUsed, setProductIdUsed] = useState([]);

	const textColor = useColorModeValue("black", "white");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	// const [purchaseSelected, setPurchaseSelected] = useContext(PurchaseContext);

	const {
		watch,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const quantity = watch("quantity");
	const price = watch("unitprice");
	const product = watch("product");

	const onSubmit = (data) => {
		console.log({ data });
		const valueNumber = Number(data.unitprice.replace(",", "."));

		setItems((prev) => {
			const productObj = data.product.split(";");
			let id;
			if (itemSelected) {
				id = itemSelected.id;
				const itemIndex = prev.findIndex((item) => item.id === id);
				let items = [...prev];
				items[itemIndex] = {
					id,
					product: {
						id: productObj[0],
						name: productObj[1],
					},
					quantity: data.quantity,
					unitValue: valueNumber,
					totalValue: valueNumber * data.quantity,
				};

				console.log({ prev });

				return items;
			} else {
				id = uuidv4();
				return [
					...prev,
					{
						id,
						product: {
							id: productObj[0],
							name: productObj[1],
						},
						quantity: data.quantity,
						unitValue: valueNumber,
						totalValue: valueNumber * data.quantity,
					},
				];
			}
		});
		onClose();
	};

	useEffect(() => {
		const productStored = localStorage.getItem("products");
		if (!productStored) {
			api.get(`/stock/products/list`)
				.then((response) => {
					if (response.data.length > 0) {
						setProducts(response.data);
						localStorage.setItem(
							"products",
							JSON.stringify(response.data)
						);
					}
				})
				.catch((error) => {
					if (error.code === 401) {
						localStorage.removeItem("token");
					}
				});
		} else {
			setProducts(JSON.parse(productStored));
		}
	}, []);

	useEffect(() => {
		if (itemSelected) {
			const product = itemSelected.product;
			setValue("product", product.id + ";" + product.name);
		} else {
			setValue("quantity", 1);
			setValue("unitprice", "0");
			setValue("product", null);
		}

		setProductIdUsed(items.map((item) => item.product.id));
	}, [isOpen, itemSelected, setValue, items]);

	return (
		<>
			<Button mx="20px" onClick={onOpen}>
				{itemSelected ? (
					<MdEdit />
				) : (
					<>
						<MdAddShoppingCart /> Item{" "}
					</>
				)}
			</Button>
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
						<DrawerHeader>Adicionar Item</DrawerHeader>

						<DrawerBody>
							<FormLabel htmlFor="product">Produto</FormLabel>
							<Select
								px="5px"
								placeholder="Produto"
								defaultValue={
									itemSelected
										? itemSelected.id +
										  ";" +
										  itemSelected.name
										: null
								}
								{...register("product")}
							>
								{products.map(
									(product) =>
										!productIdUsed.find(
											(productId) =>
												productId == product.id
										) && (
											<option
												key={product.id}
												value={
													product.id +
													";" +
													product.name
												}
											>
												{product.name}
											</option>
										)
								)}
							</Select>
							<Text color="tomato">
								{errors.product?.message}
							</Text>

							<FormLabel htmlFor="quantity">Quantidade</FormLabel>
							<Input
								id="quantity"
								placeholder="Quantidade"
								defaultValue={
									itemSelected ? itemSelected.quantity : 1
								}
								color={textColor}
								{...register("quantity")}
							/>
							<Text color="tomato">
								{errors.quantity?.message}
							</Text>

							<FormLabel htmlFor="unitprice">
								Preço Unitário
							</FormLabel>
							<Input
								id="unitprice"
								placeholder="Preço Unitário"
								step=".01"
								pattern="[0-9]+([\.,][0-9]+)?"
								defaultValue={
									itemSelected ? itemSelected.unitValue : 0
								}
								color={textColor}
								value={price?.replace(/\./g, ",")}
								{...register("unitprice")}
							/>
							<Text color="tomato">
								{errors.unitprice?.message}
							</Text>

							<FormLabel htmlFor="total">Total</FormLabel>
							<Input
								id="total"
								placeholder="Total"
								color={textColor}
								variant="filled"
								defaultValue={
									itemSelected ? itemSelected.totalValue : 0
								}
								value={(+price?.replace(",", ".") * quantity > 0
									? +price?.replace(",", ".") * quantity
									: itemSelected
									? itemSelected.quantity *
									  itemSelected.unitValue
									: 0
								).toLocaleString("pt-br", {
									style: "currency",
									currency: "BRL",
								})}
								readOnly
								{...register("total")}
							/>
							<Text color="tomato">{errors.total?.message}</Text>
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
