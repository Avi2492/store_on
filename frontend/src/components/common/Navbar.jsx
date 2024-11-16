import { Link } from "react-router-dom";
import {
	RiLockLine,
	RiLoginCircleLine,
	RiLogoutCircleRLine,
	RiShoppingBagLine,
	RiUserAddLine,
} from "@remixicon/react";
import Logo from "../ui/Logo";
import { useUserStore } from "../../store/useUserStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	// const { cart } = useCartStore();
	const cart = false;
	return (
		<header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
			<div className="container mx-auto px-4 py-2">
				<div className="flex flex-wrap justify-between items-center">
					<Link to="/">
						<Logo />
					</Link>

					<nav className="flex flex-wrap items-center gap-4">
						<Link
							to={"/"}
							className="text-gray-300 hover:text-emerald-400 transition duration-300
					 ease-in-out">
							Home
						</Link>
						{user && (
							<Link
								to={"/cart"}
								className="relative group text-gray-300 hover:text-emerald-400 transition duration-300
							ease-in-out">
								<RiShoppingBagLine
									className="inline-block mr-1 group-hover:text-emerald-400"
									size={20}
								/>
								<span className="hidden sm:inline">Cart</span>
								{cart.length > 0 && (
									<span
										className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5
									text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out">
										{cart.length}
									</span>
								)}
							</Link>
						)}
						{isAdmin && (
							<Link
								className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
								to={"/secret-dashboard"}>
								<RiLockLine
									className="inline-block mr-1"
									size={18}
								/>
								<span className="hidden sm:inline">Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className="bg-gray-700 hover:bg-gray-600 text-white p-2
						rounded-md flex items-center transition duration-300 ease-in-out"
								onClick={logout}>
								<RiLogoutCircleRLine size={18} />
								<span className="hidden sm:inline ml-2">Logout</span>
							</button>
						) : (
							<>
								<Link
									to={"/sign-up"}
									className="bg-emerald-600 hover:bg-emerald-700 text-white p-2
									rounded-md flex items-center transition duration-300 ease-in-out">
									<RiUserAddLine
										className="mr-2"
										size={18}
									/>
									Sign Up
								</Link>
								<Link
									to={"/sign-in"}
									className="bg-gray-700 hover:bg-gray-600 text-white p-2
									rounded-md flex items-center transition duration-300 ease-in-out">
									<RiLoginCircleLine
										className="mr-2"
										size={18}
									/>
									Login
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
