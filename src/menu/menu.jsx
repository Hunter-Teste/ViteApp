import { React, useState, useRef, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link, useSubmit } from "react-router-dom";
import { BiExit, BiHome, BiCar, BiAddToQueue, BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaCogs } from "react-icons/fa";
import { BsPersonVcard } from "react-icons/bs";
import Cookies from "universal-cookie";
import "../assets/style/App.css";
import logo from "../assets/img/logo_hunter_branca.png";
import logo_alt from "../assets/img/logo_hunter.png";
import icon from "../assets/img/icon.png";
//
function Menu() {
	const cookies = new Cookies();
	const token = cookies.get("token");
	//
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(2);
	const [searchValue, setSearchValue] = useState("");
	//
	const [usuarios, setUsuarios] = useState([]);
	const [user, setUser] = useState("");
	//
	const [isOpen, setIsOpen] = useState(false);
	const [isHidden, setIsHidden] = useState(true);
	//
	const submit = useSubmit();
	//
	useEffect(() => {
		axios.get(import.meta.env.VITE_APP_USUARIOS_URL).then((response) => {
			setUsuarios(response.data);
		});
		//
		if (token) {
			const decoded = jwt_decode(token);
			setUser(decoded.nome);
			//
			if (decoded.nv_acesso == 2) {
				setIsHidden(false);
			}
			if (decoded.nv_acesso < 2) {
				setIsHidden(true);
			}
			if (decoded.nv_acesso == 0) {
				cookies.remove("token");
				submit(null, {
					action: "/",
				});
			}
		}
		//
		if (!token) {
			cookies.remove("token");
			submit(null, {
				action: "/",
			});
		}
	}, []);

	const sidebarRef = useRef(null);
	const maxSidebarRef = useRef(null);
	const miniSidebarRef = useRef(null);
	// const roundoutRef = useRef(null);
	const maxToolbarRef = useRef(null);
	// const logoRef = useRef(null);
	// const contentRef = useRef(null);

	const handleMenu = () => {
		const sidebar = sidebarRef.current;
		const maxSidebar = maxSidebarRef.current;
		const miniSidebar = miniSidebarRef.current;
		// const roundout = roundoutRef.current;
		const maxToolbar = maxToolbarRef.current;
		// const logo = logoRef.current;

		if (sidebar.classList.contains("-translate-x-48")) {
			// max sidebar
			sidebar.classList.remove("-translate-x-48");
			sidebar.classList.add("translate-x-none");
			maxSidebar.classList.remove("hidden");
			maxSidebar.classList.add("flex");
			miniSidebar.classList.remove("flex");
			miniSidebar.classList.add("hidden");
			maxToolbar.classList.add("translate-x-0");
			maxToolbar.classList.remove("translate-x-24", "scale-x-0");
			// logo.classList.remove("ml-12");
		} else {
			// mini sidebar
			sidebar.classList.add("-translate-x-48");
			sidebar.classList.remove("translate-x-none");
			maxSidebar.classList.add("hidden");
			maxSidebar.classList.remove("flex");
			miniSidebar.classList.add("flex");
			miniSidebar.classList.remove("hidden");
			maxToolbar.classList.add("translate-x-24", "scale-x-0");
			maxToolbar.classList.remove("translate-x-0");
			// logo.classList.add("ml-12");
		}
	};
	//
	// calcula o índice inicial e final dos elementos a serem renderizados
	const startIndex = currentPage * 2;
	const endIndex = Math.min(startIndex + 2, usuarios.length);

	// gera os números das páginas
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(usuarios.length / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	const logout = () => {
		cookies.remove("token");
		// submit(null, {
		// 	action: "/",
		// });
	};

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const persistModal = () => {
		setIsOpen(true);
	};

	const pesquisar = (e) => {
		setSearchValue(e.target.value);
		setCurrentPage(0);
	};

	return (
		<div className="h-full min-h-screen">
			{/*  */}

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-50 w-screen"
					onClose={persistModal}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed  inset-0 overflow-y-auto">
						<div className="flex  min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full h-full md:w-3/6   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900 success text-center"
									>
										<div className="mt-4 flex absolute right-0 top-0 justify-around">
											<button
												type="button"
												className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 font-medium text-[#] text-lg mr-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
												onClick={closeModal}
											>
												<CgClose />
											</button>
										</div>
										<div className="flex flex-col justify-center items-center m-10">
											<img
												src={logo_alt}
												className=" mb-0 "
												width="125"
												alt="logo"
											/>
											{/* <h2 className="text-black"></h2> */}
										</div>
									</Dialog.Title>
									<table className=" flex flex-col justify-center items-center">
										<thead className="bg-gray-100 rounded-t-2xl w-full border-b border-gray-300 flex justify-center h-16">
											<div className="flex w-full justify-around items-center">
												<label className="text-gray-500 font-semibold text-md uppercase tracking-wider">
													Usuários Cadastrados
												</label>

												<span className="flex text-gray-500 border-b border-gray-500 p-0.5">
													<BiSearch />
													<input
														className="border-0 border-gray-600 h-4 mx-1 focus:outline-none focus:ring-0 text-gray-500 bg-transparent"
														type="text"
														value={searchValue}
														onChange={(e) => pesquisar(e)}
													/>
												</span>
											</div>
										</thead>
										<thead className="w-full px-5  flex justify-center border-gray-200 bg-gray-100 ">
											<tr>
												<th
													scope="col"
													class=" py-3 w-48 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
												>
													Nome
												</th>
												<th
													scope="col"
													class=" py-3 w-72 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
												>
													Email
												</th>
												<th
													scope="col"
													class=" py-3 w-48 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
												>
													Departamento
												</th>
												<th
													scope="col"
													class=" py-3 w-16 text-center border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider"
												>
													Nivel de Acesso
												</th>
											</tr>
										</thead>

										{usuarios
											.filter(
												(usuario) =>
													usuario.nome
														.toLowerCase()
														.includes(searchValue.toLowerCase()) ||
													usuario.dpt
														.toLowerCase()
														.includes(searchValue.toLowerCase()) ||
													usuario.email
														.toLowerCase()
														.includes(searchValue.toLowerCase())
											)
											.slice(startIndex, endIndex)
											.map((usuario) => (
												<div className=" w-full p-0" key={usuario.email}>
													<tr className="p-5 border-b border-gray-200 transition-all cursor-pointer w-full flex justify-center items-center">
														<td className="w-48 bg-white text-sm">
															{usuario.nome}
														</td>
														<td className="w-72 bg-white text-sm">
															{usuario.email}
														</td>
														<td className="w-48 bg-white text-sm">
															{usuario.dpt}
														</td>
														<td className="w-16 text-center bg-white text-sm">
															{usuario.nv_acesso}
														</td>
													</tr>
												</div>
											))}
										{/*  */}
										<thead className=" w-full text-gray-600 bg-gray-100 rounded-b-2xl h-14 flex justify-center">
											{Array(Math.ceil(usuarios.length / 2))
												.fill()
												.map((_, i) => (
													<span
														onClick={() => setCurrentPage(i)}
														className={`flex justify-center items-center p-3 m-3 cursor-pointer rounded-md transition-all hover:bg-gray-200 ${
															i === currentPage ? "bg-gray-200" : ""
														}`}
														key={i}
													>
														<button>{i + 1}</button>
													</span>
												))}
										</thead>
									</table>
									<div className="bg-white rounded-md w-full flex-col flex justify-center p-3">
										<div></div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/*  */}
			<div className="absolute w-screen hidden z-30 md:flex bg-[#370350] p-2 items-center justify-center h-16 px-10">
				<div className="logo ml-12 text-white  transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
					<img src={logo} width="100" />
				</div>
				{/* <!-- SPACER --> */}
				<div className="grow h-full flex items-center justify-center"></div>
				<div className="flex-none h-full text-center flex items-center justify-center">
					<div className="flex space-x-3 items-center px-3">
						<div className="flex-none flex justify-center">
							<div className="w-8 h-8 flex ">
								<img
									src="https://ionicframework.com/docs/img/demos/avatar.svg"
									alt="profile"
									className="shadow rounded-full object-cover"
								/>
							</div>
						</div>

						<div className="hidden md:block text-sm md:text-md text-white">
							{user}
						</div>
					</div>
				</div>
			</div>
			{/*  */}
			<aside
				ref={sidebarRef}
				className="w-60  -translate-x-48 fixed transition transform ease-in-out duration-1000 z-50 flex bg-[#53007A] "
			>
				{/* <!-- open sidebar button --> */}
				<div
					ref={maxToolbarRef}
					className="max-toolbar translate-x-24 scale-x-0 w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between dark:border-[#370350]  bg-[#53007A]  absolute top-2 rounded-full h-12"
				>
					<div className="flex pl-4 items-center space-x-2 ">
						<div>
							<div className="text-white hover:text-blue-500 dark:hover:text-[#370350]">
								<img src={logo} width="100" />
							</div>
						</div>
					</div>
					<div className="flex items-center space-x-3 group bg-gradient-to-r dark:from-[#53007A] dark:to-[#370350] pl-10 pr-2 py-1 rounded-full text-white  ">
						<div className="transform ease-in-out duration-300 mr-12 h-6 w-10"></div>
					</div>
				</div>
				<div
					onClick={handleMenu}
					className="-right-6 transition cursor-pointer transform ease-in-out duration-500 flex border-4 dark:border-[#370350] bg-[#53007A] dark:hover:bg-[#370350] absolute top-2 p-3 rounded-full text-white hover:rotate-45"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={3}
						stroke="currentColor"
						className="w-4 h-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
						/>
					</svg>
				</div>
				{/* <!-- MAX SIDEBAR--> */}
				<div
					ref={maxSidebarRef}
					className="max text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]"
				>
					<div className="h-3/4">
						<Link to={"/home"}>
							<div className="homeMx hover:ml-4 w-full text-white hover:text-purple-500 cursor-pointer bg-[#53007A] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
								<BiHome />
								<div>Home</div>
							</div>
						</Link>

						<Link to={"/veiculos"}>
							<div className="veicMx hover:ml-4 w-full text-white hover:text-purple-500 cursor-pointer  bg-[#53007A] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
								<BiCar />
								<div>Veiculos</div>
							</div>
						</Link>

						<Link to={"/motoristas"}>
							<div className="motMx hover:ml-4 w-full text-white hover:text-purple-500 cursor-pointer  bg-[#53007A] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
								<BsPersonVcard />
								<div>Motoristas</div>
							</div>
						</Link>
					</div>
					<div>
						<div
							onClick={openModal}
							className="hover:ml-4 w-full text-white hover:text-purple-500 cursor-pointer bg-[#53007A] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3"
						>
							<FaCogs />
							<div>Configurações</div>
						</div>
					</div>
					<div>
						<Link onClick={logout} to={"/"}>
							<div
								onClick={logout}
								className="hover:ml-4 w-full text-white hover:text-purple-500 cursor-pointer mt-4  bg-[#53007A] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3"
							>
								<BiExit />
								<div>Sair da Conta</div>
							</div>
						</Link>
					</div>
				</div>
				{/* <!-- MINI SIDEBAR--> */}
				<div
					ref={miniSidebarRef}
					className="mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]"
				>
					<div className="h-3/4">
						{/* minHome */}
						<Link to={"/home"}>
							<div className="home hover:ml-4 cursor-pointer justify-end pr-5 text-white hover:text-purple-500 w-full bg-[#53007A] p-3 rounded-full transform ease-in-out duration-300 flex">
								<BiHome />
							</div>
						</Link>
						{/* minVeiculos */}
						<Link to={"/veiculos"}>
							<div className="veic hover:ml-4 cursor-pointer justify-end pr-5 text-white hover:text-purple-500 w-full bg-[#53007A] p-3 rounded-full transform ease-in-out duration-300 flex">
								<BiCar />
							</div>
						</Link>
						<Link to={"/motoristas"}>
							<div className="mot hover:ml-4 cursor-pointer justify-end pr-5 text-white hover:text-purple-500 w-full bg-[#53007A] p-3 rounded-full transform ease-in-out duration-300 flex">
								<BsPersonVcard />
							</div>
						</Link>
					</div>
					{/* minLogout */}
					<div hidden={isHidden}>
						<div
							onClick={openModal}
							className="hover:ml-4 cursor-pointer flex justify-end pr-5 text-white hover:text-purple-500 w-full bg-[#53007A] p-3 rounded-full transform ease-in-out duration-300"
						>
							<FaCogs />
						</div>
					</div>

					<div>
						<Link onClick={logout} to={"/"}>
							<div className="hover:ml-4 cursor-pointer mt-4 flex justify-end pr-5 text-white hover:text-purple-500 w-full bg-[#53007A] p-3 rounded-full transform ease-in-out duration-300">
								<BiExit />
							</div>
						</Link>
					</div>
				</div>
			</aside>
		</div>
	);
}

export default Menu;
