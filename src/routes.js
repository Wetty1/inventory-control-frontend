import React from "react";

import { Icon } from "@chakra-ui/react";
import {
	MdBarChart,
	MdPerson,
	MdHome,
	MdLock,
	MdOutlineFastfood,
	MdSwapHoriz,
	MdOutlineShoppingCart,
	MdAttachMoney,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import Revenue from "views/admin/revenue";
import DataTables from "views/admin/dataTables";
import Movements from "views/admin/movements";
import Products from "views/admin/products";
import Purchase from "views/admin/purchase";

import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
	{
		name: "Main Dashboard",
		layout: "/admin",
		path: "/default",
		icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
		component: MainDashboard,
	},
	{
		name: "Movimentações",
		layout: "/admin",
		icon: (
			<Icon as={MdSwapHoriz} width="20px" height="20px" color="inherit" />
		),
		path: "/movements",
		component: Movements,
	},
	{
		name: "Produtos",
		layout: "/admin",
		icon: (
			<Icon
				as={MdOutlineFastfood}
				width="20px"
				height="20px"
				color="inherit"
			/>
		),
		path: "/products",
		component: Products,
	},
	{
		name: "Compras",
		layout: "/admin",
		path: "/purchase",
		icon: (
			<Icon
				as={MdOutlineShoppingCart}
				width="20px"
				height="20px"
				color="inherit"
			/>
		),
		component: Purchase,
	},
	{
		name: "Receita",
		layout: "/admin",
		path: "/revenue",
		icon: (
			<Icon
				as={MdAttachMoney}
				width="20px"
				height="20px"
				color="inherit"
			/>
		),
		component: Revenue,
	},
	{
		name: "Sign In",
		layout: "/auth",
		path: "/sign-in",
		icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
		component: SignInCentered,
	},
];

export default routes;
