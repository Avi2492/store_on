import { useState } from "react";
import { motion } from "framer-motion";
import CustomInput from "../components/ui/CustomInput";
import {
	RiArrowRightLine,
	RiFlashlightFill,
	RiLoaderLine,
	RiLockPasswordLine,
	RiMailAiLine,
	RiUserAddLine,
} from "@remixicon/react";

import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const { login, loading } = useUserStore();

	const handleLogin = (e) => {
		e.preventDefault();

		login(formData);

		navigate("/");
	};

	return (
		<div className="flex flex-col justify-center py-2 sm:px-6 lg:px-6">
			<motion.div
				className="sm:mx-auto sm:w-full sm:max-w-md"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ opacity: 0.8, y: 0.2 }}>
				<h2 className="mt-2 text-3xl font-extrabold text-center flex items-center justify-center gap-2">
					Hi There, Welcome Again{" "}
					<span className="text-emerald-500">
						<RiFlashlightFill size={40} />
					</span>
				</h2>

				<motion.div
					className="mt-6 sm:mx-auto sm:w-full sm:max-w-md"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ opacity: 0.8, y: 0.2 }}>
					<div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form
							onSubmit={handleLogin}
							className="space-y-6">
							<CustomInput
								label={"Email"}
								placeholder={"Enter your email"}
								icon={RiMailAiLine}
								id={"email"}
								type={"email"}
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
							/>

							<CustomInput
								label={"Password"}
								placeholder={"Enter your password"}
								icon={RiLockPasswordLine}
								id={"password"}
								type={"password"}
								value={formData.password}
								onChange={(e) =>
									setFormData({ ...formData, password: e.target.value })
								}
							/>

							<button
								type="submit"
								className="w-full flex justify-center py-2 px-4 border border-transparent
							rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
							 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
								disabled={loading}>
								{loading ? (
									<>
										<RiLoaderLine
											className="mr-2 h-5 w-5 animate-spin"
											aria-hidden="true"
										/>
										Loading...
									</>
								) : (
									<>
										<RiUserAddLine
											className="mr-2 h-5 w-5"
											aria-hidden="true"
										/>
										Login
									</>
								)}
							</button>
						</form>
						<p className="mt-8 text-center text-sm text-gray-400">
							{"Don't"} have an account?{" "}
							<Link
								to="/sign-up"
								className="font-medium text-emerald-400 hover:text-emerald-300">
								Signup here <RiArrowRightLine className="inline h-4 w-4" />
							</Link>
						</p>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default LoginPage;
