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
import { useRef, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { MdAddShoppingCart } from "react-icons/md";

const schema = yup.object({
	quantity: yup.number().required("Campo obrigatório"),
	unitprice: yup.number().required("Campo obrigatório"),
	total: yup.string().required("Campo obrigatório"),
});

export default function RegisterItemDrawer() {
	const textColor = useColorModeValue("black", "white");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	const [item, setItem] = useState({});

	const [quantity, setQuantity] = useState(1);
	const [price, setPrice] = useState(0);

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
			<Button mx="20px" onClick={onOpen}>
				<MdAddShoppingCart /> Item
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
							<Select px="5px" placeholder="Produto">
								<option>Center Box</option>
							</Select>

							<FormLabel htmlFor="quantity">Quantidade</FormLabel>
							<Input
								id="quantity"
								placeholder="Quantidade"
								color={textColor}
								onChange={(e) => {
									console.log(e);
									setQuantity(e);
								}}
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
								color={textColor}
								onChange={(e) => {
									console.log(e);
									setPrice(e.target.value);
								}}
								{...register("unitprice")}
							/>
							<Text color="tomato">
								{errors.unitprice?.message}
							</Text>

							<FormLabel htmlFor="total">Total</FormLabel>
							<Input
								id="total"
								placeholder="Quantidade"
								color={textColor}
								variant="filled"
								value={quantity * price}
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
