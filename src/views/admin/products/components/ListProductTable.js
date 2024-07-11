import {
	Flex,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	Input,
	Button,
} from "@chakra-ui/react";
import React, { useContext, useMemo } from "react";
import {
	useGlobalFilter,
	usePagination,
	useSortBy,
	useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "./MenuRegisters";
import { IoMdEye } from "react-icons/io";

import ProductContext from "../context/ProductContext";

const columnsData = [
	{
		Header: "NOME",
		accessor: "name",
	},
	{
		Header: "CATEGORIA",
		accessor: "category",
	},
	{
		Header: "SALDO",
		accessor: "balance",
	},
	{
		Header: "MINIMO",
		accessor: "min",
	},
	{
		Header: "ULTIMO PRECO",
		accessor: "last_price",
	},
	{
		Header: "AÇÕES",
		accessor: "action",
	},
];

export default function ListProductTable(props) {
	const { tableData, setProductSelected } = props;

	// const columns = useMemo(() => columnsData, [columnsData]);
	const data = useMemo(() => tableData, [tableData]);

	const [products, setProducts] = useContext(ProductContext);

	const tableInstance = useTable(
		{
			columns: columnsData,
			data,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		initialState,
	} = tableInstance;
	initialState.pageSize = 5;

	const textColor = useColorModeValue("secondaryGray.900", "white");
	const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
	return (
		<Card
			direction="column"
			w="100%"
			px="0px"
			overflowX={{ sm: "scroll", lg: "hidden" }}
		>
			<Flex
				px="25px"
				justify="space-between"
				mb="20px"
				align="start"
				gap="16px"
			>
				{/* <DrawerRegister /> */}
				<Input placeholder="Nome do produto" />
				<Menu />
			</Flex>
			<Table
				{...getTableProps()}
				variant="simple"
				color="gray.500"
				mb="24px"
			>
				<Thead>
					{headerGroups.map((headerGroup, index) => (
						<Tr {...headerGroup.getHeaderGroupProps()} key={index}>
							{headerGroup.headers.map((column, index) => (
								<Th
									{...column.getHeaderProps(
										column.getSortByToggleProps()
									)}
									pe="10px"
									key={index}
									borderColor={textColor}
								>
									<Flex
										justify="space-between"
										align="center"
										fontSize={{ sm: "10px", lg: "12px" }}
										color="gray.400"
									>
										{column.render("Header")}
									</Flex>
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
					{page.map((row, index) => {
						prepareRow(row);
						return (
							<Tr {...row.getRowProps()} key={index}>
								{row.cells.map((cell, index) => {
									let data = "";
									if (cell.column.Header === "NOME") {
										data = (
											<Flex align="center">
												<Text
													color={textColor}
													fontSize="sm"
													fontWeight="700"
												>
													{cell.value}
												</Text>
											</Flex>
										);
									} else if (cell.column.Header === "SALDO") {
										data = (
											<Flex align="center">
												<Text
													me="10px"
													color={textColor}
													fontSize="sm"
													fontWeight="700"
												>
													{cell.value}
												</Text>
											</Flex>
										);
									} else if (
										cell.column.Header === "MINIMO"
									) {
										data = (
											<Text
												color={textColor}
												fontSize="sm"
												fontWeight="700"
											>
												{cell.value}
											</Text>
										);
									} else if (
										cell.column.Header === "ULTIMO PRECO"
									) {
										data = (
											<Flex align="center">
												<Text
													me="10px"
													color={textColor}
													fontSize="sm"
													fontWeight="700"
												>
													{cell.value.toLocaleString(
														"pt-br",
														{
															style: "currency",
															currency: "BRL",
														}
													)}
												</Text>
											</Flex>
										);
									} else if (
										cell.column.Header === "CATEGORIA"
									) {
										data = (
											<Flex align="center">
												<Text
													me="10px"
													color={textColor}
													fontSize="sm"
													fontWeight="700"
												>
													{cell.value}
												</Text>
											</Flex>
										);
									} else if (cell.column.Header === "AÇÕES") {
										data = (
											<Flex align="center">
												<Button
													onClick={() =>
														setProductSelected(
															row.original
														)
													}
												>
													<IoMdEye />
												</Button>
											</Flex>
										);
									}
									return (
										<Td
											{...cell.getCellProps()}
											key={index}
											fontSize={{ sm: "14px" }}
											minW={{
												sm: "150px",
												md: "200px",
												lg: "auto",
											}}
											borderColor="transparent"
										>
											{data}
										</Td>
									);
								})}
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</Card>
	);
}
