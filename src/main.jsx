import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "./menu/menu";
import Index from ".";
import Login from "./login/login";
import Home from "./dashboard/home/home";
import Cadastro from "./login/cadastro";
import Reset from "./login/reset_senha";
import Pass from "./login/nova_senha";
import RoletaMotorista from "./roleta/roleta_motorista";
import RoletaNovo from "./roleta/roleta_cliente";
import Veiculos from "./dashboard/veiculos/veiculos";
import VeiculosCad from "./dashboard/veiculos/veiculos_cadastro";
import Motoristas from "./dashboard/motoristas/motoristas";
import MotoristasCad from "./dashboard/motoristas/motoristas_cadastro";
import Erro from "./erro/404";
import "./index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Index />,
		errorElement: <Erro />,
	},
	{
		path: "home",
		element: <Home />,
		errorElement: <Erro />,
	},
	//
	{
		path: "veiculos",
		element: <Veiculos />,
		errorElement: <Erro />,
	},
	{
		path: "/veiculos/cadastro",
		element: <VeiculosCad />,
		errorElement: <Erro />,
	},
	//
	{
		path: "motoristas/cadastro",
		element: <MotoristasCad />,
		errorElement: <Erro />,
	},
	//
	{
		path: "motoristas/",
		element: <Motoristas />,
		errorElement: <Erro />,
	},
	//
	{
		path: "cadastro",
		element: <Cadastro />,
		errorElement: <Erro />,
	},
	{
		path: "reset",
		element: <Reset />,
		errorElement: <Erro />,
	},
	{
		path: "/reset/senha/",
		element: <Pass />,
		errorElement: <Erro />,
	},
	//
	{
		path: "/roleta/motorista",
		element: <RoletaMotorista />,
		errorElement: <Erro />,
	},
	{
		path: "/roleta/novo",
		element: <RoletaNovo />,
		errorElement: <Erro />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
