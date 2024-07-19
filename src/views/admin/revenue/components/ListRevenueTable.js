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
	useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
	useGlobalFilter,
	usePagination,
	useSortBy,
	useTable,
} from "react-table";
import dayjs from "dayjs";

// Custom components
import Card from "components/card/Card";

import { MdDelete } from "react-icons/md";
import { RegisterCategoryDrawer } from "./RegisterRevenueDrawer";
import { useRevenue } from "../../../../hooks/revenue/useRevenue";

const columnsData = [
	{
		Header: "DATA",
		accessor: "date",
	},
	{
		Header: "VALOR",
		accessor: "value",
	},
	{
		Header: "AÇÕES",
		accessor: "actions",
	},
];

export default function ListRevenueTable() {
	// const [revenues, setRevenues] = useState([]);
	const [startTime, setStartTime] = useState(
		dayjs().subtract(7, "day").format("YYYY-MM-DD")
	);
	const [endTime, setEndTime] = useState(dayjs().format("YYYY-MM-DD"));

	const { revenues, deleteRevenue, fetchRevenueList } = useRevenue();

	const toast = useToast({
		position: "bottom-right",
		isClosable: true,
	});

	// const columns = useMemo(() => columnsData, [columnsData]);
	const data = useMemo(() => revenues, [revenues]);

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
	// const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

	useEffect(() => {
		const fetchData = async () =>
			await fetchRevenueList(startTime, endTime);
		new Promise((resolve) => {
			const output = fetchData();
			console.log({ output });
			resolve(output);
		});
	}, [endTime, startTime]);

	const handleDeleteRevenue = useCallback(
		async (id) => {
			const response = await deleteRevenue(id);
			console.log({ response });
			toast({
				status: "success",
				description: "Receita excluída com sucesso!",
			});
		},
		[deleteRevenue, toast]
	);

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
				<Input
					placeholder="Data Inicial"
					type={"date"}
					textColor={textColor}
					value={startTime}
					onChange={(e) => {
						console.log(e.target.value);
						setStartTime(e.target.value);
					}}
				/>
				<Input
					placeholder="Data Final"
					type={"date"}
					textColor={textColor}
					value={endTime}
					onChange={(e) => {
						setEndTime(e.target.value);
					}}
				/>
				<RegisterCategoryDrawer />
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
									if (cell.column.Header === "VALOR") {
										data = (
											<Flex align="center">
												<Text
													color={textColor}
													fontSize="sm"
													fontWeight="700"
												>
													{Number(
														cell.value
													).toLocaleString("pt-br", {
														style: "currency",
														currency: "BRL",
													})}
												</Text>
											</Flex>
										);
									} else if (cell.column.Header === "DATA") {
										data = (
											<Flex align="center">
												<Text
													me="10px"
													color={textColor}
													fontSize="sm"
													fontWeight="700"
												>
													{new Date(
														cell.value
													).toLocaleDateString(
														"pt-br"
													)}
												</Text>
											</Flex>
										);
									} else if (cell.column.Header === "AÇÕES") {
										data = (
											<Flex align="center">
												<RegisterCategoryDrawer
													revenue={row.original}
												/>
												<Button
													onClick={() =>
														handleDeleteRevenue(
															row.original.id
														)
													}
												>
													<MdDelete color={"red"} />
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
