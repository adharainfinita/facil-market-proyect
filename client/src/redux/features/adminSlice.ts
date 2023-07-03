import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasicData, AnalyticsData } from "../../utils/interfaces";

interface AdminState {
	basicData: BasicData;
	analyticsData: AnalyticsData;
}

const initialState: AdminState = {
	basicData: {
		totalProducts: 0,
		totalUsers: 0,
		totalSales: 0,
		ProductsOnAccesories: {},
	},
	analyticsData: {
		productsInfo: [],
		allUsers: [],
	},
};

const adminSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		getResumeInfo: (state, action: PayloadAction<BasicData>) => {
			state.basicData = action.payload;
		},
		getAnalyticsData: (state, action: PayloadAction<AnalyticsData>) => {
			state.analyticsData = action.payload;
		},
	},
});

export const { getResumeInfo, getAnalyticsData } = adminSlice.actions;
export default adminSlice.reducer;
