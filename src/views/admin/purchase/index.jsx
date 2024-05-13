/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
	Card,
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	Divider,
} from "@chakra-ui/react";
import { columnsDataColumns } from "views/admin/purchase/variables/columnsData";
import React, { useEffect, useState } from "react";
import ProductDetail from "./components/ProductDetail";
import api from "api/index";
import ListProductTable from "./components/ListProductTable";

export default function Settings() {
	const [productSelected, setProductSelected] = useState("");
	const [products, setProducts] = useState([]);
	// Chakra Color Mode
	useEffect(() => {
		api.get(`/stock/products/list`)
			.then((response) => {
				let datas = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<ListProductTable
				columnsData={columnsDataColumns}
				tableData={products}
				setProductSelected={setProductSelected}
			/>
		</Box>
	);
}
