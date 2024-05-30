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
import { PurchaseContext } from "../context/PurchaseContext";

export default function PurchaseDetail(props) {
	const { purchaseSelected, setPurchaseSelected } = props;
	const [items, setItems] = useState(purchaseSelected.items);

	const textColor = useColorModeValue("secondaryGray.900", "white");
	const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

	const handleSave = useCallback(() => {}, []);

	const handleDelete = useCallback(() => {}, []);

	console.log({ purchaseSelected, items });

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
								{items
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

					<RegisterItemDrawer setItems={setItems} items={items} />
				</Flex>
				<Flex>
					<ListPurchaseItemTable setItems={setItems} items={items} />
				</Flex>
			</Card>
		</Box>
	);
}
