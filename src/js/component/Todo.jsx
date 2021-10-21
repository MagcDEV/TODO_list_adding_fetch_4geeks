import React, { useState, useEffect } from "react";

const Todos = () => {
	let [tasks, setTasks] = useState([]);
	const apiUrl = "https://assets.breatheco.de/apis/fake/todos/user/magcdev";

	const fetchData = async (endpoint, solic) => {
		const response = await fetch(endpoint, solic);
		let datos = await response.json();
		return datos;
	};

	const handleDelete = async () => {
		fetchData(apiUrl, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		});
		setTasks([]);
	};

	const updateGet = async () => {
		let response = await fetchData(apiUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (
			response.msg ==
			"This use does not exists, first call the POST method first to create the list for this username"
		) {
			response = await fetchData(apiUrl, {
				method: "POST",
				body: "[]",
				headers: {
					"Content-Type": "application/json"
				}
			});
		}
		if (response[0].id > 0) {
			setTasks(response);
		}
	};

	const updatePut = async newTasks => {
		fetchData(apiUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newTasks)
		});
	};

	useEffect(() => {
		updateGet();
	}, []);

	const handleKeyDown = event => {
		if (event.key == "Enter") {
			setTasks([
				...tasks,
				{
					id: tasks.length + 1,
					label: event.target.value,
					buttonVisible: false,
					done: false
				}
			]);
			updatePut([
				...tasks,
				{
					id: tasks.length + 1,
					label: event.target.value,
					buttonVisible: false,
					done: false
				}
			]);
		}
	};

	const handleRemove = todo_x => {
		let newTasks = tasks.filter(item => item.id !== todo_x);
		if (newTasks.length > 0) {
			updatePut(newTasks);
			setTasks(newTasks);
		} else {
			updatePut([
				{
					id: 0,
					label: "all done!",
					buttonVisible: false,
					done: false
				}
			]);
			setTasks(newTasks);
		}
	};

	return (
		<div className="container mt-5 lista">
			<ul className="list-group p-2">
				<input
					placeholder="What needs to be done?"
					onKeyDown={handleKeyDown}
					type="text"
					className="form-control"
				/>
				{tasks.map(x => {
					return (
						<li
							key={x.id}
							onMouseOver={() => {
								let objIndex = tasks.findIndex(
									obj => obj.id == x.id
								);
								tasks[objIndex].buttonVisible = true;
								setTasks([...tasks]);
							}}
							onMouseOut={() => {
								let objIndex = tasks.findIndex(
									obj => obj.id == x.id
								);
								tasks[objIndex].buttonVisible = false;
								setTasks([...tasks]);
							}}
							className="list-group-item">
							{x.label}
							<button
								type="button"
								onClick={() => handleRemove(x.id)}
								className={`btn-close position-absolute end-0 me-3 ${
									x.buttonVisible ? "visible" : "invisible"
								}`}
								aria-label="Close"></button>
						</li>
					);
				})}
			</ul>
			<div className="d-flex flex-row justify-content-around p-2">
				<div>{tasks.length} item left</div>
				<button
					onClick={() => handleDelete()}
					type="button"
					className="btn btn-danger">
					Clean all tasks
				</button>
			</div>
		</div>
	);
};

export default Todos;
