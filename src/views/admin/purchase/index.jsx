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
	Button,
} from "@chakra-ui/react";
import React, { Children, useCallback, useEffect, useState } from "react";
import api from "api/index";
import ListPurchaseTable from "./components/ListPurchaseTable";
import PurchaseDetail from "./components/PurchaseDetail";
import PurchaseContext from "./context/PurchaseContext";

export default function Settings() {
	const [purchaseSelected, setPurchaseSelected] = useState(null);
	const [purchases, setPurchases] = useState([
		{
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
		},
	]);

	// Chakra Color Mode
	useEffect(() => {
		// api.get(`/stock/products/list`)
		// 	.then((response) => {
		// 		let datas = response.data;
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
		console.log(purchaseSelected);
	}, [purchaseSelected]);

	return (
		<>
			<PurchaseContext.Provider
				value={[purchaseSelected, setPurchaseSelected]}
			>
				{!purchaseSelected && (
					<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
						<ListPurchaseTable
							tableData={purchases}
							setPurchaseSelected={setPurchaseSelected}
						/>
					</Box>
				)}
				{purchaseSelected && (
					<PurchaseDetail
						purchaseSelected={purchaseSelected}
						setPurchaseSelected={setPurchaseSelected}
					/>
				)}
			</PurchaseContext.Provider>
		</>
	);
}
