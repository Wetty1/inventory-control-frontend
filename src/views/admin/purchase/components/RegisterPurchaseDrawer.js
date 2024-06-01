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
	supplier: yup.string().required("Selecione um fornecedor"),
	date: yup.date().required("Campo obrigatório"),
});

export default function RegisterPurchaseDrawer(props) {
	const { purchases, setPurchases } = props;

	const [products, setProducts] = useState([]);

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

	const onSubmit = (data) => {
		console.log({ data });

		setPurchases((prev) => {
			return [
				...prev,
				{
					id: uuidv4().slice(0, 4),
					supplier: data.supplier,
					date: data.date,
					total_value: 0,
					items: [],
				},
			];
		});

		onClose();
	};

	return (
		<>
			<Button mx="20px" onClick={onOpen}>
				<MdAddShoppingCart />
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
							<FormLabel htmlFor="supplier">Fornecedor</FormLabel>
							<Select
								px="5px"
								placeholder="Fornecedor"
								{...register("supplier")}
							>
								<option value="center box">Center Box</option>
								<option value="cometa">Cometa</option>
								<option value="Mix Mateus">Mix Mateus</option>
								<option value="açai">Açaí</option>
							</Select>
							<Text color="tomato">
								{errors.supplier?.message}
							</Text>

							<FormLabel htmlFor="date">Data</FormLabel>
							<Input
								id="date"
								placeholder="data"
								color={textColor}
								type="date"
								defaultValue={
									new Date().toISOString().split("T")[0]
								}
								{...register("date")}
							/>
							<Text color="tomato">{errors.date?.message}</Text>
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
