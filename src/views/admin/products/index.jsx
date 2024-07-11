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
import { Box, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProductDetail from "./components/ProductDetail";
import api from "api/index";
import ListProductTable from "./components/ListProductTable";
import ProductContext from "./context/ProductContext";

export default function Settings() {
	const [productSelected, setProductSelected] = useState("");
	const [products, setProducts] = useState([]);
	const toast = useToast();
	// Chakra Color Mode
	useEffect(() => {
		api.get(`/stock/products/list-summary`)
			.then((response) => {
				console.log(response);
				let datas = response.data;
				const formattedData = datas.map((data) => {
					console.log(data);
					return {
						id: data.id,
						name: data.name,
						balance: data.balance,
						min: "-",
						category: data.categoryname,
						last_price: data.lastprice.toLocaleString("pt-br", {
							style: "currency",
							currency: "BRL",
						}),
					};
				});
				console.log(formattedData);
				setProducts(formattedData);
			})
			.catch((error) => {
				if (error.request?.status === 401) {
					localStorage.removeItem("token");

					window.location.replace("/#/auth");
				}
			});
	}, [toast]);

	return (
		<ProductContext.Provider value={[products, setProducts]}>
			<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
				{productSelected ? (
					<ProductDetail
						product={productSelected}
						setProductSelected={setProductSelected}
					/>
				) : (
					<ListProductTable
						tableData={products}
						setProductSelected={setProductSelected}
					/>
				)}
			</Box>
		</ProductContext.Provider>
	);
}
