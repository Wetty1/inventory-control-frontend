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
  Divider
} from "@chakra-ui/react";
import ColumnsTable from "../products/components/ColumnsTable";
import {
  columnsDataColumns,
} from "views/admin/products/variables/columnsData";
import tableDataColumns from "views/admin/products/variables/tableDataColumns.json";
import React, { useState } from "react";
import ProductDetail from "./components/ProductDetail";

export default function Settings() {
  const [productSelected, setProductSelected] = useState("");
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {productSelected ? 
        <ProductDetail 
          product={productSelected} 
          setProductSelected={setProductSelected}/>
      :
        <ColumnsTable
        columnsData={columnsDataColumns}
        tableData={tableDataColumns}
        setProductSelected={setProductSelected}
        />
      }        
    </Box>
  );
}
