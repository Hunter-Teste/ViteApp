import { React, useEffect, useState } from "react";
import { useSubmit } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Menu from "../../menu/menu";
import "../../assets/style/App.css";
import logo from "../../assets/img/logo_hunter_branca.png";

function Home() {
	const [user, setUser] = useState("");
	const cookies = new Cookies();
	const token = cookies.get("token");

	//
	const submit = useSubmit();
	//
	const urlString = window.location.href;
	const urlS = new URL(urlString);
	var urlID = urlS.searchParams.get("");
	//
	useEffect(() => {
		if (token) {
			const decoded = jwt_decode(token);
			setUser(decoded.nome);
		}
		//
		document.querySelector(".home").style.color = "rgb(168 85 247)";
		document.querySelector(".homeMx").style.color = "rgb(168 85 247)";
	}, []);
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<sidebar className=" w-12">
				<div className="h-full absolute top-0 left-0 bottom-0">
					<Menu />
				</div>
			</sidebar>
			{/*  */}
			<main class="main w-full  m-0 flex flex-col transition-all duration-150 ease-in md:ml-0">
				<div className="flex col w-3/4 md:w-1/3 h-80 rounded-lg m-auto bg-[#370350] flex-col justify-center items-center">
					<img src={logo} className=" mb-0 " width="250" alt="logo" />
					<h1 className="text-white text-center text-lg">
						Olá, {user}. Seja bem vindo a plataforma Hunter!
					</h1>
				</div>
			</main>
		</div>
	);
}

export default Home;
