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
	useToast,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import api from "api/index";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { MdAdd, MdEdit } from "react-icons/md";
import { useRevenue } from "../../../../hooks/revenue/useRevenue";

const schema = z.object({
	value: z.string(),
	date: z.string(),
});

export function RegisterCategoryDrawer({ revenue }) {
	const toast = useToast({
		position: "top-right",
		isClosable: true,
	});
	const textColor = useColorModeValue("black", "white");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	const { createRevenue, createdRevenue, updateRevenue, updatedRevenue } =
		useRevenue();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

	const registerWithMask = useHookFormMask(register);

	useEffect(() => {
		if (revenue) {
			console.log(revenue.date);
			setValue("date", revenue.date.substring(0, 10));
			setValue("value", revenue.value);
		}
	}, [revenue, setValue]);

	const onSubmit = async (data) => {
		try {
			console.log(data);
			if (revenue) {
				const output = await updateRevenue({
					id: revenue.id,
					...data,
					value: Number(
						data.value.replace(",", ".").replace("R$", "")
					),
				});
				console.log(output);
				// const { data: res } = await api.patch(`/revenue/update`, {
				// 	id: revenue.id,
				// 	...data,
				// 	value: Number(
				// 		data.value.replace(",", ".").replace("R$", "")
				// 	),
				// });

				// console.log({ res });
			} else {
				const output = await createRevenue({
					...data,
					value: Number(
						data.value.replace(",", ".").replace("R$", "")
					),
				});
				console.log(output);
				// const { data: res } = await api.post("/revenue/create", {
				// 	...data,
				// 	value: Number(
				// 		data.value.replace(",", ".").replace("R$", "")
				// 	),
				// });

				// console.log({ res });
			}
			toast({
				status: "success",
				title: "Receita",
				description: "Receita gravada com sucesso!",
			});

			onClose();
		} catch (error) {
			console.log(error);

			toast({
				status: "error",
				title: "Receita",
				description: "Houve um erro ao gravar a receita",
			});
		}
	};

	return (
		<>
			{revenue ? (
				<>
					<Button
						fontWeight="bold"
						color={textColor}
						onClick={onOpen}
					>
						<MdEdit />
					</Button>
				</>
			) : (
				<Button fontWeight="bold" color={textColor} onClick={onOpen}>
					<MdAdd size={32} /> Receita
				</Button>
			)}
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
						<DrawerHeader>Adicionar Receita</DrawerHeader>

						<DrawerBody>
							<FormLabel htmlFor="date">Data</FormLabel>
							<Input
								id="date"
								color={textColor}
								type="date"
								{...register("date")}
							/>
							<Text color="tomato">{errors.date?.message}</Text>

							<FormLabel htmlFor="date">Valor</FormLabel>
							<Input
								id="value"
								color={textColor}
								{...registerWithMask("value", [
									"R$ 9,99",
									"R$ 99,99",
									"R$ 999,99",
									"R$ 9999,99",
									"R$ 99999,99",
									"R$ 999999,99",
								])}
							/>
							<Text color="tomato">{errors.value?.message}</Text>
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
