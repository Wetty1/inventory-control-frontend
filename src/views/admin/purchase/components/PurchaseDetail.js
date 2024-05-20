import {
	Box,
	Flex,
	SimpleGrid,
	FormControl,
	FormLabel,
	Input,
	Stat,
	StatLabel,
	StatNumber,
	Select,
	Text,
	Heading,
	Divider,
	Button,
	IconButton,
	useColorModeValue,
} from "@chakra-ui/react";
import {
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import ListPurchaseItemTable from "./ListPurchaseItems";
import RegisterItemDrawer from "../components/RegisterItemDrawer";
import Card from "components/card/Card";
import {
	MdAddShoppingCart,
	MdArrowBack,
	MdArrowCircleLeft,
	MdCheck,
	MdChevronLeft,
	MdDelete,
} from "react-icons/md";
import Context from "../context/PurchaseContext";

export default function PurchaseDetail() {
	const textColor = useColorModeValue("secondaryGray.900", "white");
	const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

	// const [purchase, setPurchase] = useState();

	const [purchaseSelected, setPurchaseSelected] = useContext(Context);

	useEffect(() => {
		setPurchaseSelected({
			id: 1,
			supplier: "Mix Mateus",
			date: new Date(2024, 4, 14),
			total_value: 10.99,
			items: [
				{
					id: 1,
					product: "Cx Leite Betânia",
					quantity: 12,
					unitValue: 4.82,
					totalValue: 12 * 4.82,
				},
				{
					id: 2,
					product: "Pct Alho poró",
					quantity: 1,
					unitValue: 32.99,
					totalValue: 32.99,
				},
			],
		});
	}, []);

	const handleSave = useCallback(() => {}, []);

	const handleDelete = useCallback(() => {}, []);

	return (
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<Card
				direction="column"
				w="100%"
				px="0px"
				overflowX={{ sm: "scroll", lg: "hidden" }}
			>
				<Flex px="25px" justifyContent="space-between">
					<Flex alignItems="center">
						<IconButton
							icon={<MdChevronLeft />}
							onClick={() => setPurchaseSelected(null)}
						/>
						<Heading fontSize="2xl" px="10px">
							Compra #{purchaseSelected.id}
						</Heading>
					</Flex>
					<Flex>
						<Button
							mx="5px"
							color="green"
							variant="outline"
							onClick={() => handleSave()}
						>
							Gravar <MdCheck />
						</Button>
						<Button
							mx="5px"
							color="red.400"
							variant="outline"
							onClick={() => handleDelete()}
						>
							Excluir <MdDelete />
						</Button>
					</Flex>
				</Flex>
				<Divider padding="10px" />
				<Flex px="25px" py="10px">
					<FormControl>
						<FormLabel>Fornecedor</FormLabel>
						<Select
							px="5px"
							placeholder="Fornecedor"
							value={purchaseSelected.supplier}
						>
							<option value="center box">Center Box</option>
							<option value="cometa">Cometa</option>
							<option value="Mix Mateus">Mix Mateus</option>
							<option value="açai">Açaí</option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>Data</FormLabel>
						<Input
							type="date"
							color={textColor}
							value={
								purchaseSelected.date
									.toISOString()
									.split("T")[0]
							}
						/>
					</FormControl>
				</Flex>
				<Divider padding="10px" />
				<Flex justifyContent={"space-between"} alignItems="flex-end">
					<Box>
						<Stat mx="25px" my="25px">
							<StatLabel>Total</StatLabel>
							<StatNumber>
								{purchaseSelected.items
									.reduce(
										(acc, item) => acc + item.totalValue,
										0
									)
									.toLocaleString("pt-br", {
										style: "currency",
										currency: "BRL",
									})}
							</StatNumber>
						</Stat>
					</Box>

					<RegisterItemDrawer />
				</Flex>
				<Flex>
					<ListPurchaseItemTable tableData={purchaseSelected.items} />
				</Flex>
			</Card>
		</Box>
	);
}