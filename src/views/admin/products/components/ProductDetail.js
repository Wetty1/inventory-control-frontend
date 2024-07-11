import {
	Text,
	SimpleGrid,
	useColorModeValue,
	Icon,
	IconButton,
	Flex,
	Box,
	useToast,
	Image,
	toast,
	Spinner,
} from "@chakra-ui/react";

import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import ExtractProductDetail from "views/admin/products/components/ExtractProductDetail";

import { MdArrowBack, MdAttachMoney, MdOutlineEqualizer } from "react-icons/md";
import PricesCharts from "./PricesCharts";

import { columnsDataColumns } from "views/admin/movements/variables/columnsData";
import tableDataColumns from "views/admin/movements/variables/tableDataColumns.json";
import { useEffect, useState } from "react";
import api from "api/index";
import { dollarToBRL } from "utils/DollarToBRL";

export default function ProductDetail({ product, setProductSelected }) {
	const brandColor = useColorModeValue("brand.500", "white");
	const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
	// const toast = useToast();

	const [data, setData] = useState({});

	useEffect(() => {
		api.get(`stock/products/${product.id}`)
			.then((response) => {
				console.log(response.data);
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [product]);

	// useEffect(() => {
	// 	console.log(product);
	// 	setData(product);
	// }, [product]);

	return (
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<Flex justifyContent={"start"} mb="20px">
				<IconButton
					icon={<MdArrowBack />}
					onClick={() => setProductSelected(null)}
					aria-label="Voltar"
					mr={"10px"}
				/>
				<Text fontSize={"3xl"} fontWeight={"bold"}>
					{product?.name}
				</Text>
			</Flex>
			<SimpleGrid
				columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
				gap="20px"
				mb="20px"
			>
				<MiniStatistics
					startContent={
						<IconBox
							w="56px"
							h="56px"
							bg={boxBg}
							icon={
								<Icon
									w="32px"
									h="32px"
									as={MdAttachMoney}
									color={brandColor}
								/>
							}
						/>
					}
					name="Ultimo custo"
					value={Number(
						product?.last_price
							.replace("$", "")
							.toLocaleString("pt-br", {
								style: "currency",
								currency: "BRL",
							})
					)}
				/>
				<MiniStatistics
					startContent={
						<IconBox
							w="56px"
							h="56px"
							bg={boxBg}
							icon={
								<Icon
									w="32px"
									h="32px"
									as={MdOutlineEqualizer}
									color={brandColor}
								/>
							}
						/>
					}
					name="Saldo"
					value={product?.balance}
				/>
			</SimpleGrid>
			<SimpleGrid
				columns={{ base: 1, md: 2, xl: 2 }}
				gap="20px"
				mb="20px"
			>
				<PricesCharts />

				{data.events?.length > 0 ? (
					<ExtractProductDetail tableData={data.events} />
				) : (
					<Spinner />
				)}
			</SimpleGrid>
		</Box>
	);
}
