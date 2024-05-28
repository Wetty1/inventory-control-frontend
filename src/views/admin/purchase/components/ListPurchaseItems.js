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
import React, { useContext, useEffect, useMemo } from "react";
import {
	useGlobalFilter,
	usePagination,
	useSortBy,
	useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { MdEdit } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

import PurchaseContext from "../context/PurchaseContext";
import { useState } from "react";

const columnsDataColumns = [
	{
		Header: "ID",
		accessor: "id",
	},
	{
		Header: "PRODUTO",
		accessor: "product",
	},
	{
		Header: "QUANTIDADE",
		accessor: "quantity",
	},
	{
		Header: "VALOR UNIDADE",
		accessor: "unitValue",
	},
	{
		Header: "VALOR TOTAL",
		accessor: "totalValue",
	},
	{
		Header: "AÇÕES",
	},
];
export default function ListPurchaseItemTable(props) {
	const { items } = props;
	// const [purchaseSelected, setPurchaseSelected] = useContext(PurchaseContext);
	const columnsData = columnsDataColumns;
	// const [items, setItems] = useState(purchaseSelected.items);

	const columns = useMemo(() => columnsData, [columnsData]);
	const data = useMemo(() => items, [items]);

	const tableInstance = useTable(
		{
			columns,
			data,
			autoResetHiddenColumns: true,
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

	useEffect(() => {
		console.log(page);
	}, [page]);

	return (
		<Card
			direction="column"
			w="100%"
			px="0px"
			overflowX={{ sm: "scroll", lg: "hidden" }}
		>
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
									if (cell.column.Header === "QUANTIDADE") {
										data = (
											<Flex align="center">
												<Text
													color={textColor}
													fontSize="sm"
													fontWeight="700"
													cursor={"pointer"}
												>
													{cell.value}
												</Text>
											</Flex>
										);
									} else if (
										cell.column.Header === "PRODUTO"
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
									} else if (
										cell.column.Header === "VALOR TOTAL"
									) {
										data = (
											<Text
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
										);
									} else if (
										cell.column.Header === "VALOR UNIDADE"
									) {
										data = (
											<Text
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
												) || ""}
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
												<Button>
													<MdEdit />
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
