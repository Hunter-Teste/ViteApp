import { React, useState, useEffect, Fragment } from "react";
import { Link, useSubmit } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { BiCog, BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { Dialog, Transition } from "@headlessui/react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Menu from "../../menu/menu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/style/App.css";
import logo from "../../assets/img/logo_hunter.png";

function Veiculos() {
	const [veiculos, setVeiculos] = useState([]);
	const [selectedVeiculo, setSelectedVeiculo] = useState(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [searchValue, setSearchValue] = useState("");
	//
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	//
	const cookies = new Cookies();
	const decoded = jwt_decode(cookies.get("token"));
	// const nome = cookies.get("nome");
	// const email = cookies.get("email");
	// const acesso = cookies.get("acesso");
	//
	// const [email, setEmail] = useState("");
	// const [dpt, setDpt] = useState("");
	const [id, setId] = useState("");
	const [placa, setPlaca] = useState("");
	const [renavam, setRenavam] = useState("");
	const [chassi, setChassi] = useState("");
	const [km, setKm] = useState("");
	const [cod_fipe, setCodFipe] = useState("");
	const [fabricante, setFabricante] = useState("");
	const [modelo, setModelo] = useState("");
	const [ano_fab, setAnoFab] = useState("");
	const [ano_mod, setAnoMod] = useState("");
	const [cor, setCor] = useState("");
	const [tipoVeiculo, setTipoVeiculo] = useState("0");
	const [estilo, setEstilo] = useState("0");
	const [combustivel, setCombustivel] = useState("0");
	const [combustivel_alt, setCombustivel_alt] = useState([1]);
	const [crlv, setCrlv] = useState(null);
	const [crv, setCrv] = useState(null);
	//
	const [isDisabled, setIsDisabled] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [configHidden, setConfigHidden] = useState(true);
	//
	const submit = useSubmit();
	//

	// fetch veiculos
	useEffect(() => {
		axios.get(import.meta.env.VITE_APP_VEICULO_CAD_URL).then((response) => {
			setVeiculos(response.data);
		});
		//
		if (decoded.nv_acesso == 2) {
			setConfigHidden(false);
		}
		if (decoded.nv_acesso < 2) {
			setConfigHidden(true);
		}
		// setTimeout(() => {
		// 	setLoading(false);
		// }, 3000);
		// highlight nav item
		document.querySelector(".veic").style.color = "rgb(168 85 247)";
		document.querySelector(".veicMx").style.color = "rgb(168 85 247)";
	}, []);

	const handleChange = (fieldName) => (event) => {
		switch (fieldName) {
			case "placa":
				setPlaca(event.target.value);
				break;
			case "renavam":
				setRenavam(event.target.value);
				break;
			case "chassi":
				setChassi(event.target.value);
				break;
			case "km":
				setKm(event.target.value);
				break;
			case "cod_fipe":
				setCodFipe(event.target.value);
				console.log(cod_fipe);
				break;
			case "fabricante":
				setFabricante(event.target.value);
				break;
			case "modelo":
				setModelo(event.target.value);
				break;
			case "ano_fab":
				setAnoFab(event.target.value.replace(/\D/g, ""));
				break;
			case "ano_mod":
				setAnoMod(event.target.value.replace(/\D/g, ""));
				break;
			case "cor":
				setCor(event.target.value);
				break;
			case "estilo":
				setEstilo(event.target.value);
				break;
			case "tipoVeiculo":
				setTipoVeiculo(event.target.value);
				break;
			//
			case "crlv":
				//
				setCrlv(event.target.value);
				break;
			//
			case "crv":
				//
				setCrv(event.target.value);

				break;
			default:
				break;
		}
	};
	// handler for when user clicks on a veiculo
	const handleSelectVeiculo = (veiculo) => {
		//
		setSelectedVeiculo(veiculo);
		//
		// setEmail(veiculo.email);
		// setDpt(veiculo.dpt);
		setId(veiculo.id);
		setPlaca(veiculo.placa);
		setRenavam(veiculo.renavam);
		setChassi(veiculo.chassi);
		setFabricante(veiculo.fabricante);
		setKm(veiculo.km);
		setCodFipe(veiculo.cod_fipe);
		setModelo(veiculo.modelo);
		setAnoFab(veiculo.ano_fab);
		setAnoMod(veiculo.ano_mod);
		setCor(veiculo.cor);
		setTipoVeiculo(veiculo.tipo_veiculo);
		setEstilo(veiculo.estilo);
		setCombustivel(veiculo.combustivel);
		setCombustivel_alt(veiculo.combustivel_alt);
		setCrlv(veiculo.crlv);
		setCrv(veiculo.crv);
		//
		setVeiculos(
			veiculos.map((item) =>
				item.id === veiculo.id
					? { ...item, selecionado: true }
					: { ...item, selecionado: false }
			)
		);
	};
	//
	// calcula o índice inicial e final dos elementos a serem renderizados
	const startIndex = currentPage * 4;
	const endIndex = Math.min(startIndex + 4, veiculos.length);

	// gera os números das páginas
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(veiculos.length / itemsPerPage); i++) {
		pageNumbers.push(i);
	}
	//Consultar veiculos
	const handleConsulta = () => {
		if (!id) {
			toast.warn("Por favor, selecione algum veículo!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}
		setIsOpen(true);
		setIsDisabled(true);
		setIsHidden(true);
	};
	//
	const handleEditarVeiculo = () => {
		setIsOpen(true);
		setIsDisabled(false);
		setIsHidden(false);
	};
	//
	const closeModal = () => {
		setIsOpen(false);
	};
	const closeModalOut = () => {
		setIsOpen(true);
	};

	async function attVeiculo() {
		setLoading(true);
		try {
			await axios.put(import.meta.env.VITE_APP_VEICULO_URL + id, {
				email_update: decoded.email,
				placa: placa,
				renavam: renavam,
				chassi: chassi,
				km: km,
				cod_fipe: cod_fipe,
				fabricante: fabricante,
				modelo: modelo,
				ano_fab: ano_fab,
				ano_mod: ano_mod,
				cor: cor,
				tipo_veiculo: tipoVeiculo,
				estilo: estilo,
				combustivel: combustivel,
				combustivel_alt: combustivel_alt,
				crlv: crlv,
				crv: crv,
			});
			console.log(`Veículo ${id} atualizado com sucesso`);
			toast.success(
				"Veículo atualizado com sucesso!",
				{
					position: toast.POSITION.TOP_CENTER,
				},
				setTimeout(() => {
					window.location.reload();
				}, 2500)
			);
			setLoading(false);
		} catch (error) {
			console.error(error.response.data.error);
		}
	}

	const pesquisar = (e) => {
		setSearchValue(e.target.value);
		setCurrentPage(0);
	};

	return (
		<div className="w-full h-full min-h-screen flex justify-center items-center">
			<sidebar className=" w-12">
				<div className="h-full fixed top-0 left-0 bottom-0">
					<Menu />
				</div>
			</sidebar>

			{/* Visualização Veiculo Cadastrado */}

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-50 w-screen"
					onClose={closeModalOut}
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
												src={logo}
												className=" mb-0 "
												width="125"
												alt="logo"
											/>
											{/* <h2 className="text-black"></h2> */}
										</div>
									</Dialog.Title>
									<div className="bg-white rounded-md w-full h-full p-10">
										{/*  */}
										<div className="grid xl:grid-cols-2 xl:gap-6">
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													disabled={isDisabled}
													type="text"
													className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
													placeholder=" "
													value={placa}
													maxLength={7}
													required
													onChange={handleChange("placa")}
												/>
												<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Placa
												</label>
											</div>
											{/*  */}
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													disabled={isDisabled}
													type="text"
													className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
													placeholder=" "
													value={modelo}
													maxLength={60}
													required
													onChange={handleChange("modelo")}
												/>
												<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Modelo
												</label>
											</div>
										</div>
										{/*  */}
										<div className="grid xl:grid-cols-3 xl:gap-6">
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													disabled={isDisabled}
													type="text"
													className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
													placeholder=" "
													value={renavam}
													maxLength={11}
													required
													onChange={handleChange("renavam")}
												/>
												<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Renavam
												</label>
											</div>

											{/*  */}
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													disabled={isDisabled}
													type="text"
													className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
													placeholder=" "
													value={chassi}
													maxLength={17}
													required
													onChange={handleChange("chassi")}
												/>
												<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Chassi
												</label>
											</div>
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													disabled={isDisabled}
													type="text"
													className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
													placeholder=" "
													value={cod_fipe}
													maxLength={10}
													required
													onChange={handleChange("cod_fipe")}
												/>
												<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Código FIPE
												</label>
											</div>
										</div>

										{/*  */}
										<div className="grid xl:grid-cols-3 xl:gap-6">
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													disabled={isDisabled}
													type="text"
													className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
													placeholder=" "
													value={tipoVeiculo}
													required
													onChange={handleChange("tipoVeiculo")}
												/>
												<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Tipo de Veiculo
												</label>
											</div>
											{/*  */}
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													disabled={isDisabled}
													type="text"
													className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
													placeholder=" "
													value={fabricante}
													maxLength={30}
													required
													onChange={handleChange("fabricante")}
												/>
												<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Fabricante
												</label>
											</div>
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													disabled={isDisabled}
													type="text"
													className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
													placeholder=" "
													value={km}
													maxLength={20}
													required
													onChange={handleChange("km")}
												/>
												<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													KM
												</label>
											</div>
										</div>

										{/*  */}
										<div className="grid xl:grid-cols-3 xl:gap-6">
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													disabled={isDisabled}
													type="text"
													className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
													placeholder=" "
													value={ano_fab}
													maxLength={4}
													required
													onChange={handleChange("ano_fab")}
												/>
												<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Ano de Fabricação
												</label>
											</div>
											{/*  */}
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													disabled={isDisabled}
													type="text"
													className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
													placeholder=" "
													value={ano_mod}
													maxLength={4}
													required
													onChange={handleChange("ano_mod")}
												/>
												<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Ano de Modelo
												</label>
											</div>
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													disabled={isDisabled}
													type="text"
													className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
													placeholder=" "
													value={cor}
													maxLength={10}
													required
													onChange={handleChange("cor")}
												/>
												<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Cor
												</label>
											</div>
										</div>

										{/*  */}
										<div className="grid xl:grid-cols-2 xl:gap-6">
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													disabled={isDisabled}
													type="text"
													className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
													placeholder=" "
													value={estilo}
													required
													onChange={handleChange("estilo")}
												/>
												<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Estilo
												</label>
											</div>
											{/*  */}
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													disabled={isDisabled}
													type="text"
													className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
													placeholder=" "
													value={combustivel}
													required
													onChange={handleChange("combustivel")}
												/>
												<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Combustivel
												</label>
											</div>
										</div>
										{/*  */}

										<div className="grid xl:grid-cols-2 xl:gap-6 mb-6">
											<div className="relative mt-4 z-0 flex justify-center">
												{/*  */}
												<a
													href={crlv}
													onChange={handleChange("crlv")}
													target="_blank"
													className="crv-label file w-full hover:bg-[#370350] bg-[#53007A] py-0.5 cursor-pointer transition-all text-sm rounded-md text-white text-center"
												>
													Visualizar CRLV
												</a>
											</div>
											{/*  */}
											<div className="relative mt-4 z-0 flex justify-center">
												{/*  */}
												<a
													href={crv}
													onChange={handleChange("crv")}
													target="_blank"
													className="crv-label file w-full hover:bg-[#370350] bg-[#53007A] py-0.5 cursor-pointer transition-all text-sm rounded-md text-white text-center"
												>
													Visualizar CRV
												</a>
											</div>
										</div>
										<div className="mt-4 flex relative right-0 top-0 justify-around">
											<button
												type="button"
												hidden={isHidden}
												className="hover:bg-[#53007A] border-gray-400 hover:text-gray-100 cursor-pointer transition-all text-sm border rounded-md w-48 p-0.5"
												onClick={attVeiculo}
											>
												Atualizar dados
											</button>
										</div>
										{loading && (
											<div className="loader mt-5 relative flex justify-center items-center transition-all">
												<BarLoader
													color={"#53007A"}
													loading={loading}
													size={30}
												/>
											</div>
										)}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Visualizar CRLV */}
			{/*  */}
			<main className="main w-full m-0 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0">
				<div className="flex col w-3/4 md:w-1/3 p-10 h-full rounded-lg m-auto flex-col justify-center items-center">
					<div className=" w-full content-veic flex flex-col justify-center items-center">
						<table>
							<thead className="bg-[#370350] rounded-t-2xl w-full border-b border-[#53007A] flex justify-center h-16">
								<div className="flex w-full justify-around items-center">
									<label className="text-white font-semibold text-md uppercase tracking-wider">
										Veículos Cadastrados
									</label>

									<span className="flex text-white border-b p-0.5">
										<BiSearch />
										<input
											className="border-0 border-[#fff] h-4 mx-1 focus:outline-none focus:ring-0 text-white bg-transparent"
											type="text"
											value={searchValue}
											onChange={(e) => pesquisar(e)}
										/>
									</span>
								</div>
							</thead>
							<thead className="bg-[#370350] w-full flex justify-center h-16">
								<tr>
									<th
										scope="col"
										className="p-4 v128 w-16 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
									>
										{/* <input type={"checkbox"} disabled /> */}
									</th>
									{/*  */}
									<th
										scope="col"
										className="p-4 v128 w-32 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
									>
										Placa
									</th>

									<th
										scope="col"
										className="p-4 v128 w-48 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
									>
										Modelo
									</th>
									<th
										scope="col"
										className="p-4 v128 w-32 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
									>
										Cor
									</th>
									<th
										scope="col"
										className="p-4 v128 w-32 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
									>
										Fabricante
									</th>

									<th
										scope="col"
										className="p-4 v128 w-32 text-center text-xs font-medium text-gray-100 uppercase tracking-wider"
									>
										Data de Cadastro
									</th>
									{/* Botão para selecionar veiculo */}
									<th
										hidden={configHidden}
										scope="col"
										className="p-4 w-20 text-center text-xs font-medium text-gray-100 uppercase tracking-wider"
									></th>
								</tr>
							</thead>

							{/* {veiculos.map((veiculo) => (
							<div></div>
						))} */}
							{veiculos
								.filter(
									(veiculo) =>
										veiculo.placa
											.toLowerCase()
											.includes(searchValue.toLowerCase()) ||
										veiculo.modelo
											.toLowerCase()
											.includes(searchValue.toLowerCase()) ||
										veiculo.fabricante
											.toLowerCase()
											.includes(searchValue.toLowerCase())
								)
								.slice(startIndex, endIndex)
								.map((veiculo) => (
									//  Listando veiculos cadastrados
									<div
										key={veiculo.id}
										onClick={() => handleSelectVeiculo(veiculo)}
										className="border-b border-[#370350] p-0 bg-[#53007A] w-full flex justify-center"
									>
										{/* <h2>ID - Modelo - Placa</h2> */}
										<tr
											id={"tb" + veiculo.id}
											// onClick={() => handleSelectVeiculo(veiculo)}
											className={`bg-[#53007A] p-5 ct-tr transition-all hover:bg-violet-900 cursor-pointer w-full flex justify-center items-center ${
												veiculo.selecionado ? "bg-violet-900" : ""
											}`}
										>
											<th
												scope="col"
												className="p-4 w-16 v128 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
											>
												<input
													type={"checkbox"}
													checked={veiculo.selecionado}
													onChange={() => handleSelectVeiculo(veiculo)}
												/>
											</th>
											{/* PLACA */}
											<th
												scope="col"
												className="p-4 w-32 v128 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
											>
												{veiculo.placa}
											</th>

											{/* MODELO */}
											<th
												scope="col"
												className="p-4 w-48 v128 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
											>
												{veiculo.modelo}
											</th>

											{/* COR */}
											<th
												scope="col"
												className="p-4 w-32 v128 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
											>
												{veiculo.cor}
											</th>

											{/* FABRICANTE */}
											<th
												scope="col"
												className="p-4 w-32 v128 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
											>
												{veiculo.fabricante}
											</th>

											{/* DATA CADASTRO */}
											<th
												scope="col"
												className="p-4 w-32 v128 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"
											>
												{veiculo.data
													.replace(/^(\d{4}-\d{2}-\d{2}).+$/, "$1")
													.split("-")
													.reverse()
													.join("-")}
											</th>

											{/* Visualizar */}
											<th
												hidden={configHidden}
												scope="col"
												onClick={() => handleSelectVeiculo(veiculo)}
												className="p-0 w-20 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"
											>
												<button
													className="p-4 text-lg"
													onClick={handleEditarVeiculo}
												>
													<BiCog />
												</button>
											</th>
										</tr>
									</div>
								))}
							{/*  */}
							{loading && (
								<div className="loader bg-[#370350] m-0 p-2 relative flex justify-center items-center transition-all">
									<BarLoader color={"#fff"} loading={loading} size={30} />
								</div>
							)}

							<thead className="bg-[#370350] text-white rounded-b-2xl w-full h-14 flex justify-center">
								{Array(Math.ceil(veiculos.length / 4))
									.fill()
									.map((_, i) => (
										<span
											onClick={() => setCurrentPage(i)}
											className={`flex justify-center items-center p-4 m-2 cursor-pointer rounded-md transition-all hover:bg-[#53007A] ${
												i === currentPage ? "bg-[#53007A]" : ""
											}`}
											key={i}
										>
											<button>{i + 1}</button>
										</span>
									))}
							</thead>
						</table>
					</div>
					<h2 className="text-black">
						{/* Veiculo selecionado: {placa + " " + modelo} */}
					</h2>
					<div className="flex justify-center mt-7 ">
						<input
							type="button"
							value="Visualizar Veiculo"
							onClick={handleConsulta}
							className="btt consultar mx-2 p-0.5 bg-[#53007A] hover:bg-[#370350] cursor-pointer transition-all text-sm border rounded-md w-44 text-white"
						/>
						<Link to={"/veiculos/cadastro"}>
							<input
								type="button"
								value="Cadastrar Novo Veiculo"
								className="btt cadastrar mx-2 bg-[#53007A] hover:bg-[#370350] cursor-pointer transition-all text-sm border rounded-md w-44 p-0.5 text-white"
							/>
						</Link>
					</div>
				</div>
			</main>
			<ToastContainer autoClose={3000} />
		</div>
	);
}

export default Veiculos;
