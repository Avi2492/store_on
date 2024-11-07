import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios.js";

export const useUserStore = create((set, get) => ({
	user: null,
	loading: false,
	checkingAuth: true,

	signup: async ({ username, email, password, confirmPassword }) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Password do not match");
		}

		try {
			const response = await axiosInstance.post("auth/signup", {
				username,
				email,
				password,
			});

			// console.log("Signup payload:", { username, email, password });

			set({ user: response.data.user, loading: false });

			toast.success("Account Created " + username);
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || error.message);
		}
	},

	login: async ({ email, password }) => {
		set({ loading: true });
		try {
			const response = await axiosInstance.post("auth/login", {
				email,
				password,
			});

			set({ user: response.data.user, loading: false });

			toast.success("Logged In Success");
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || error.message);
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("auth/logout");
			set({ user: null });

      toast.success("Logout Success");
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred during logout");
		}
	},
}));
