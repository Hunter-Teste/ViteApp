import { React, useState } from "react";
import { Link } from "react-router-dom";
import { FaCarCrash } from "react-icons/fa";
import "../assets/style/App.css";
import logo from "../assets/img/logo_hunter_branca.png";

function Erro() {
	return (
		<div className="bg-[#53007A] w-full h-screen flex justify-center items-center">
			<div className="flex flex-col justify-center items-center m-10 text-white text-6xl">
				<Link to={"/"} className="flex-nowrap flex">
					<h1 className="mx-5">404</h1>
					<FaCarCrash />
				</Link>

				<h1 className="text-white text-2xl mt-3">Página não encontrada...</h1>
				<Link to={"/"}>
					<button
						type="button"
						className=" bt-5 border-gray-100 hover:text-gray-100 cursor-pointer transition-all text-sm border rounded-md w-48 p-0.5"
					>
						Voltar
					</button>
				</Link>
			</div>
		</div>
	);
}

export default Erro;
