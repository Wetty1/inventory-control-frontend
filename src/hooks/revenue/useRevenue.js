import { useMutation } from "react-query";
import api from "api/index";
import { queryClient } from "../../lib/react-query";
import { useState } from "react";

export const useRevenue = () => {
	const [revenues, setRevenues] = useState([]);

	const fetchRevenueList = async (startDate, endDate) => {
		const output = await queryClient.fetchQuery({
			queryKey: ["revenues", startDate, endDate],
			queryFn: async () => {
				const { data } = await api.get(
					`/revenue/list?startDate=${startDate}&endDate=${endDate}`
				);
				setRevenues(data);
				return data;
			},
		});

		return output;
	};

	const { data: createdRevenue, mutateAsync: createRevenue } = useMutation({
		mutationKey: ["create-revenue"],
		mutationFn: async (data) => {
			const { data: res } = await api.post(`/revenue/create`, data);
			setRevenues([...revenues, data]);
			return res;
		},
	});

	const { data: updatedRevenue, mutateAsync: updateRevenue } = useMutation({
		mutationKey: ["update-revenue"],
		mutationFn: async (data) => {
			const { data: res } = await api.patch(`/revenue/update`, data);
			return res;
		},
		onSuccess: (data, variable) => {
			setRevenues((prev) =>
				[...prev].map((elements) =>
					elements.id === variable.id ? data : elements
				)
			);
		},
	});

	const { data: deletedRevenue, mutateAsync: deleteRevenue } = useMutation({
		mutationKey: ["delete-revenue"],
		mutationFn: async (id) => {
			const { data: res } = await api.delete(`/revenue/delete/${id}`);
			return res;
		},
		onSuccess: (data, variable) => {
			setRevenues((prev) =>
				[...prev].filter((elements) => elements.id !== variable)
			);
		},
	});

	return {
		fetchRevenueList,
		revenues,
		createRevenue,
		updateRevenue,
		deleteRevenue,
		createdRevenue,
		updatedRevenue,
		deletedRevenue,
	};
};
