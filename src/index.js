import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RTLLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { QueryClientProvider } from "react-query";
import { queryClient } from "lib/react-query";

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<HashRouter>
					<Switch>
						<Route path={`/auth`} component={AuthLayout} />
						<Route path={`/admin`} component={AdminLayout} />
						<Route path={`/rtl`} component={RTLLayout} />
						<Redirect from="/" to="/auth" />
					</Switch>
				</HashRouter>
			</QueryClientProvider>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById("root")
);
