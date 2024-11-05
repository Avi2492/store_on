import React from "react";
import useUserStore from "../store/useUserStore.js";
import {useNavigate} from "react-router-dom"

const HomePage = () => {

  const navigate = useNavigate()

  const {logout} = useUserStore();

	const handleLogout = (e) => {
		e.preventDefault();

    logout();

    navigate("/sign-in");
	};
	return (
		<>
			<button onClick={handleLogout}>Logout</button>
		</>
	);
};

export default HomePage;
