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
	SelectField,
	Select,
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
import Menu from "components/menu/MainMenu";
import { MdAdd, MdAddShoppingCart, MdEdit } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

import Context from "../context/PurchaseContext";

const columnsDataColumns = [
	{
		Header: "ID",
		accessor: "id",
	},
	{
		Header: "DATA",
		accessor: "date",
	},
	{
		Header: "FORNECEDOR",
		accessor: "supplier",
	},
	{
		Header: "TOTAL",
		accessor: "total_value",
	},
	{
		Header: "AÇÕES",
	},
];
export default function ListPurchaseTable(props) {
	const { tableData } = props;

	const columnsData = columnsDataColumns;

	const columns = useMemo(() => columnsData, [columnsData]);
	const data = useMemo(() => tableData, [tableData]);
	const [purchaseSelected, setPurchaseSelected] = useContext(Context);

	const tableInstance = useTable(
		{
			columns,
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
			<Flex px="25px" justify="space-between" mb="20px" align="center">
				<Select px="5px" placeholder="Fornecedor">
					<option>Center Box</option>
				</Select>
				<Select px="5px" placeholder="Período">
					<option value={1}>1 Dia</option>
					<option value={2}>1 Semana</option>
					<option value={3}>1 Mês</option>
				</Select>
				<Select px="5px" placeholder="Ordem">
					<option>Crescente</option>
					<option>Decrescente</option>
				</Select>
				<Button px="5px">
					<MdAddShoppingCart />
				</Button>
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
									borderColor={borderColor}
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
							<Tr
								{...row.getRowProps()}
								key={index}
								_hover={{ backgroundColor: "#1111" }}
							>
								{row.cells.map((cell, index) => {
									let data = "";
									if (cell.column.Header === "DATA") {
										console.log(cell.value);
										data = (
											<Flex align="center">
												<Text
													color={textColor}
													fontSize="sm"
													fontWeight="700"
													cursor={"pointer"}
												>
													{new Date(
														cell.value
													).toLocaleDateString(
														"pt-br"
													)}
												</Text>
											</Flex>
										);
									} else if (
										cell.column.Header === "FORNECEDOR"
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
									} else if (cell.column.Header === "TOTAL") {
										data = (
											<Text
												color={textColor}
												fontSize="sm"
												fontWeight="700"
											>
												{cell.value}
											</Text>
										);
									} else if (cell.column.Header === "ID") {
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
														setPurchaseSelected(
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
