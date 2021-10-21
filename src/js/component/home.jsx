import React from "react";
import Todos from "./Todo.jsx";
//create your first component
const Home = () => {
	return (
		<div className="container-fluid pt-3">
			<h1 className="titulo text-center">todos</h1>
			<Todos />
		</div>
	);
};

export default Home;
