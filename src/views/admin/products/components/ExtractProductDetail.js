import {
	Flex,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	Button,
	useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
	useGlobalFilter,
	usePagination,
	useSortBy,
	useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { dollarToBRL } from "utils/DollarToBRL";

const columnsDataColumns = [
	{
		Header: "TIPO",
		accessor: "type",
	},
	{
		Header: "QUANTIDADE",
		accessor: "quantity",
	},
	{
		Header: "PREÇO/UN.",
		accessor: "price",
	},
	{
		Header: "DATE",
		accessor: "date",
	},
];

export default function ExtractProductDetail(props) {
	const { tableData } = props;

	console.log(tableData);

	const columns = columnsDataColumns;
	const data = useMemo(() => tableData, [tableData]);

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
				<Text
					color={textColor}
					fontSize="22px"
					fontWeight="700"
					lineHeight="100%"
				>
					Geral
				</Text>
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
						let valueColor =
							row.cells[0].value === "entrada"
								? "green.400"
								: "red.400";
						console.log(row);
						return (
							<Tr {...row.getRowProps()} key={index}>
								{row.cells.map((cell, index) => {
									let data = "";
									if (cell.column.Header === "TIPO") {
										data = (
											<Flex align="center">
												<Text
													me="10px"
													color={valueColor}
													fontSize="sm"
													fontWeight="700"
												>
													{cell.value}
												</Text>
											</Flex>
										);
									} else if (
										cell.column.Header === "QUANTIDADE"
									) {
										data = (
											<Text
												color={valueColor}
												fontSize="sm"
												fontWeight="700"
											>
												{cell.value}
											</Text>
										);
									} else if (cell.column.Header === "DATE") {
										data = (
											<Text
												color={textColor}
												fontSize="sm"
												fontWeight="700"
											>
												{new Date(
													cell.value
												).toLocaleDateString("pt-br")}
											</Text>
										);
									} else if (cell.column.Header === "SALDO") {
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
										cell.column.Header === "PREÇO/UN."
									) {
										data = (
											<Text
												color={textColor}
												fontSize="sm"
												fontWeight="700"
											>
												{row.original.purchase
													? `${dollarToBRL(
															row.original
																.purchase
																.unit_value
													  )}`
													: "-"}
											</Text>
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