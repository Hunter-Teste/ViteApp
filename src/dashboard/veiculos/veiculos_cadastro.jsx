import { React, useState, useEffect, Fragment } from "react";
import { useSubmit } from "react-router-dom";
import axios from "axios";
import { BarLoader } from "react-spinners";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Select from "react-select";
import { CgClose } from "react-icons/cg";
import { Dialog, Transition } from "@headlessui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//
import Menu from "../../menu/menu";
import "../../assets/style/App.css";
import logo from "../../assets/img/logo_hunter.png";
function VeiculosCad() {
	// const [email, setEmail] = useState("");
	// const [dpt, setDpt] = useState("");
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
	const [crlvNome, setCrlvNome] = useState(null);
	const [crvNome, setCrvNome] = useState("");
	//
	const [previewCRV, setPreviewCRV] = useState("");
	const [previewCRLV, setPreviewCRLV] = useState("");
	//
	const [post, setPost] = useState("");
	const [loading, setLoading] = useState(false);
	// const [showMessage, setShowMessage] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [nullOpen, setNullOpen] = useState(false);
	const [verfyOpenCRV, setVerifyOpenCRV] = useState(false);
	const [verfyOpenCRLV, setVerifyOpenCRLV] = useState(false);
	const [hidden, setHidden] = useState(true);
	const [cadModal, setCadModal] = useState(false);
	//
	const cookies = new Cookies();
	const decoded = jwt_decode(cookies.get("token"));
	// const email = cookies.get("email");
	// const dpt = cookies.get("departamento");

	//
	const optionsCombustivel = [
		{ value: "gasolina", label: "Gasolina" },
		{ value: "etanol", label: "Etanol" },
		{ value: "flex", label: "Flex" },
		{ value: "gnv", label: "GNV" },
	];
	//
	const submit = useSubmit();
	//
	const formData = new FormData();

	const customStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: "transparent",
			border: "none",
			borderBottom: "1px solid rgb(156 163 175)", // mude a cor da borda conforme sua necessidade
			borderRadius: "0",
			boxShadow: "none",
			textAlign: "center",
			// display: "flex", // Adiciona esta linha
			// justifyContent: "center", // Adiciona esta linha
			// position: "relative",
			paddingTop: "0.25rem",
			// "&:hover": {
			// 	borderBottom: "1px solid white", // mude aqui caso queira mudar no hover
			// },
		}),
		placeholder: (provided) => ({
			...provided,
			color: "#ffae00",
			fontSize: "0.8em",
		}),
	};

	useEffect(() => {
		axios.get(import.meta.env.VITE_APP_VEICULO_URL + placa).then((response) => {
			const data = response.data.data[0];
			// const header = response.data.header[0];
			setPost(data);
			// console.log(post);
		});
		document.querySelector(".veic").style.color = "rgb(168 85 247)";
		document.querySelector(".veicMx").style.color = "rgb(168 85 247)";
	}, []);

	async function sinesp() {
		setLoading(true);
		// setShowMessage(true);
		try {
			const response = await axios.post(
				import.meta.env.VITE_APP_VEICULO_URL + "sinesp",
				{
					placa: placa,
					login_cpf: import.meta.env.VITE_APP_LOGIN_CPF,
					login_senha: import.meta.env.VITE_APP_LOGIN_SENHA,
					token: import.meta.env.VITE_APP_TOKEN_SINESP,
				}
			);
			setPost(response.data);

			const responseSesp = await axios.post(
				import.meta.env.VITE_APP_VEICULO_URL + "sesp",
				{
					placa: placa,
					token: import.meta.env.VITE_APP_TOKEN_SINESP,
				}
			);
			setPost(responseSesp.data);
			// Modal de cadastro
			setCadModal(true);
			// Loading false
			setLoading(false);
			//
			if (response.data.data) {
				setIsOpen(true);
			} else {
				setNullOpen(true);
			}
			//
		} catch (error) {
			console.error(error);
			setLoading(false);
			// setShowMessage(false);
			toast.error(
				"ERRO 500: Houve um problema interno no servidor. Por favor aguarde alguns minutos e tente novamente. ",
				{
					position: toast.POSITION.TOP_CENTER,
				}
			);
		}
	}

	async function cadVeiculos() {
		setLoading(true);
		//
		try {
			formData.append("email_clb", decoded.email);
			formData.append("dpt", decoded.dpt);
			formData.append("placa", placa);
			formData.append("renavam", renavam);
			formData.append("chassi", chassi);
			formData.append("km", km);
			formData.append("cod_fipe", cod_fipe);
			formData.append("fabricante", fabricante);
			formData.append("modelo", modelo);
			formData.append("ano_fab", ano_fab);
			formData.append("ano_mod", ano_mod);
			formData.append("cor", cor);
			formData.append("tipo_veiculo", tipoVeiculo);
			formData.append("estilo", estilo);
			formData.append("combustivel", combustivel[0].value);
			if (combustivel[1]) {
				formData.append("combustivel_alt", combustivel_alt[1].value);
			} else {
				setCombustivel_alt(null);
				formData.append("combustivel_alt", combustivel_alt[1]);
			}
			formData.append("crlv", crlv);
			formData.append("crv", crv);

			const postCar = await axios.post(
				import.meta.env.VITE_APP_VEICULO_CAD_URL,
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } }
			);

			console.log(postCar);
			setPost(postCar);
			toast.success(
				" Veículo cadastrado com sucesso! Você será redirecionado em breve. ",
				{
					position: toast.POSITION.TOP_CENTER,
				},
				setTimeout(() => {
					submit(null, {
						action: "/veiculos",
					});
				}, 3500)
			);
			setLoading(false);
			block();
		} catch (error) {
			console.error(`Error: ${error}`);
			console.log("Status:", error.response.status);
			console.log("Data:", error.response.data);
			setLoading(false);
			toast.error(
				" ERRO: " + error.response.status + " " + error.response.data.message,
				{
					position: toast.POSITION.TOP_CENTER,
				}
			);
		}
	}

	async function validCorSelect() {
		const estiloElement = document.querySelector(".estilo");
		// const combustivelElement = document.querySelector(".combustivel");
		const veiculoElement = document.querySelector(".tipo_veiculo");

		estiloElement.style.color = estilo == 0 ? "#ffae00" : "";
		// combustivelElement.style.color = combustivel == 0 ? "#faf48b" : "#fff";
		veiculoElement.style.color = tipoVeiculo == 0 ? "#ffae00" : "";
	}

	const handleChange = (fieldName) => (event) => {
		switch (fieldName) {
			case "placa":
				setPlaca(event.target.value.toUpperCase());
				break;
			case "renavam":
				setRenavam(event.target.value.toUpperCase());
				break;
			case "chassi":
				setChassi(event.target.value.toUpperCase());
				break;
			case "km":
				setKm(event.target.value.replace(/\D/g, ""));
				break;
			case "cod_fipe":
				setCodFipe(event.target.value.replace(/\D/g, ""));
				break;
			case "fabricante":
				setFabricante(event.target.value.toUpperCase());
				break;
			case "modelo":
				setModelo(event.target.value.toUpperCase());
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
				//Gravando arquivo na constante CRLV
				setCrlv(event.target.files[0]);
				setCrlvNome(event.target.files[0].name);
				// Selecionando o arquivo
				const fileCRLV = event.target.files[0];
				// Criando um objeto FileReader
				const readerCRLV = new FileReader();
				//Convertendo em base64
				readerCRLV.onload = (event) => {
					setPreviewCRLV(event.target.result);
				};
				//
				readerCRLV.readAsDataURL(fileCRLV);
				//Abrindo modal com arquivo selecionado
				setVerifyOpenCRLV(true);
				break;
			//
			case "crv":
				//Gravando arquivo na constante CRV
				setCrv(event.target.files[0]);
				setCrvNome(event.target.files[0].name);

				// Selecionando o arquivo para visualizar
				const fileCRV = event.target.files[0];
				// Criando um objeto FileReader
				const readerCRV = new FileReader();
				//
				readerCRV.onload = (event) => {
					setPreviewCRV(event.target.result);
				};
				//Convertendo em base64
				readerCRV.readAsDataURL(fileCRV);
				//Abrindo modal com arquivo selecionado
				setVerifyOpenCRV(true);
				break;
			default:
				break;
		}
	};

	const handleVerification = () => {
		if (!placa || !renavam) {
			toast.warn("Por favor, verifique se os campos foram preenchidos! ", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}
		sinesp();
	};

	const handleRegistration = () => {
		if (
			!placa ||
			!renavam ||
			!chassi ||
			!km ||
			!fabricante ||
			!modelo ||
			!ano_fab ||
			!ano_mod
		) {
			toast.warn("Por favor, verifique se os campos foram preenchidos! ", {
				position: toast.POSITION.TOP_CENTER,
			});

			return;
		}

		if (tipoVeiculo == 0) {
			toast.warn("Por favor, selecione o Tipo de veiculo! ", {
				position: toast.POSITION.TOP_CENTER,
			});

			return;
		}

		if (estilo == 0) {
			toast.warn("Por favor, selecione o Estilo do veiculo! ", {
				position: toast.POSITION.TOP_CENTER,
			});

			return;
		}

		if (combustivel == 0) {
			toast.warn("Por favor, selecione o Combustível do veiculo! ", {
				position: toast.POSITION.TOP_CENTER,
			});

			return;
		}

		if (!crlv) {
			toast.warn("Por favor, adicione o CRLV do veiculo! ", {
				position: toast.POSITION.TOP_CENTER,
			});

			return;
		}

		if (!crv) {
			toast.warn("Por favor, adicione o CRV do veiculo! ", {
				position: toast.POSITION.TOP_CENTER,
			});

			return;
		}

		cadVeiculos();
	};

	const closeModalPreencher = () => {
		const sinespRequest = axios.get(
			import.meta.env.VITE_APP_VEICULO_URL + "sinesp/" + placa
		);
		const sespRequest = axios.get(
			import.meta.env.VITE_APP_VEICULO_URL + "sesp/" + placa
		);

		toast.warn("Por favor, preencha os campos destacados! ", {
			position: toast.POSITION.TOP_CENTER,
		});

		Promise.all([sinespRequest, sespRequest])
			.then(([sinespData, sespData]) => {
				const sinespDataObj = sinespData.data.data[0];
				const sespDataObj = sespData.data.data[0];

				setFabricante(sinespDataObj.marca.toUpperCase());
				setModelo(sinespDataObj.modelo.toUpperCase());
				setCor(sinespDataObj.cor.toUpperCase());

				setAnoFab(sespDataObj.ano_fabricacao);
				setAnoMod(sespDataObj.ano_modelo);

				setIsOpen(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const persistCadModal = () => {
		setCadModal(true);
	};

	const closeCadModal = () => {
		setCadModal(false);
		window.location.reload();
	};

	const closeModalNull = () => {
		setNullOpen(false);
		toast.warn("Por favor, preencha os campos destacados! ", {
			position: toast.POSITION.TOP_CENTER,
		});
	};

	const closeModalReload = () => {
		window.location.reload();
	};

	const closeModal = () => {
		setIsOpen(false);
		setNullOpen(false);
		toast.warn("Por favor, preencha os campos destacados! ", {
			position: toast.POSITION.TOP_CENTER,
		});
	};

	const closeVerifyModalCRLV = () => {
		setVerifyOpenCRLV(false);
	};

	const closeVerifyModalCRV = () => {
		setVerifyOpenCRV(false);
	};

	const crlv_label = () => {
		let input_crlv = document.querySelector(".crlv");
		input_crlv.click();
	};

	const crv_label = () => {
		let input_crv = document.querySelector(".crv");
		input_crv.click();
	};
	//
	validCorSelect();
	//
	return (
		<div className="w-full flex justify-center items-center">
			{/* sidebar menu */}
			<sidebar className=" w-12">
				<div className="h-full absolute top-0 left-0 bottom-0">
					<Menu />
				</div>
			</sidebar>
			{/* Modal de cadastro*/}
			<Transition appear show={cadModal} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-50 w-screen"
					onClose={persistCadModal}
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
								<Dialog.Panel className="w-full h-full md:w-3/6 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900 success text-center"
									>
										<div className="mt-4 flex absolute right-0 top-0 justify-around">
											<button
												type="button"
												className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 font-medium text-[#] text-lg mr-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
												onClick={closeCadModal}
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
													// disabled={true}
													type="text"
													className="block text-center py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0  peer"
													placeholder=" "
													value={placa}
													maxLength={7}
													required
													onChange={handleChange("placa")}
												/>
												<label className="absolute floating_placa text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-placeholder-shown:text-[#ffae00] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50 ">
													Placa
												</label>
											</div>
											{/*  */}
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													// disabled={true}
													type="text"
													className="block text-center py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0  peer"
													placeholder=" "
													value={modelo}
													maxLength={60}
													required
													onChange={handleChange("modelo")}
												/>
												<label className="absolute flex justify-center w-full floating_modelo text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-placeholder-shown:text-[#ffae00] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50 ">
													Modelo
												</label>
											</div>
										</div>
										{/*  */}
										<div className="grid xl:grid-cols-3 xl:gap-6">
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													// disabled={true}
													type="text"
													className="block text-center py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0  peer"
													placeholder=" "
													value={renavam}
													maxLength={11}
													required
													onChange={handleChange("renavam")}
												/>
												<label className="absolute flex justify-center w-full floating_renavam text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-placeholder-shown:text-[#ffae00] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50 ">
													Renavam
												</label>
											</div>

											{/*  */}
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													// disabled={true}
													type="text"
													className="block text-center py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0  peer"
													placeholder=" "
													value={chassi}
													maxLength={17}
													required
													onChange={handleChange("chassi")}
												/>
												<label className="absolute flex justify-center w-full text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-placeholder-shown:text-[#ffae00] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Chassi
												</label>
											</div>
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													// disabled={true}
													type="text"
													className="block text-center py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0  peer"
													placeholder=" "
													value={cod_fipe}
													maxLength={10}
													required
													onChange={handleChange("cod_fipe")}
												/>
												<label className="absolute flex justify-center w-full floating_cod_fipe text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-placeholder-shown:text-[#ffae00] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Código FIPE
												</label>
											</div>
										</div>

										{/*  */}
										<div className="grid xl:grid-cols-3 xl:gap-6">
											<div className="relative z-0 mb-4 w-full group">
												{/* Tipo de Veiculo */}

												{/*  */}
												<select
													name="floating_tipo_veiculo"
													id="floating_tipo_veiculo"
													className="block text-center tipo_veiculo py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 peer"
													placeholder=""
													value={tipoVeiculo}
													onChange={handleChange("tipoVeiculo")}
												>
													<option className="text-gray-600" value="0">
														Selecionar...
													</option>
													{/*  */}
													<option className="text-gray-600" value="carro">
														Carro
													</option>
													{/*  */}
													<option className="text-gray-600" value="moto">
														Moto
													</option>
												</select>
												<label
													htmlFor="floating_tipo_veiculo"
													className="absolute flex justify-center w-full floating_tipo_veiculo text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50"
												>
													Tipo de Veículo
												</label>
											</div>
											{/*  */}
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													// disabled={true}
													type="text"
													className="block text-center py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0  peer"
													placeholder=" "
													value={fabricante}
													maxLength={11}
													required
													onChange={handleChange("fabricante")}
												/>
												<label className="absolute flex justify-center w-full floating_fabricante text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-placeholder-shown:text-[#ffae00] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Fabricante
												</label>
											</div>
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													// disabled={true}
													type="text"
													className="block text-center py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0  peer"
													placeholder=" "
													value={km}
													maxLength={20}
													required
													onChange={handleChange("km")}
												/>
												<label className="absolute flex justify-center w-full floating_km text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-placeholder-shown:text-[#ffae00] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													KM
												</label>
											</div>
										</div>

										{/*  */}
										<div className="grid xl:grid-cols-3 xl:gap-6">
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													// disabled={true}
													type="text"
													className="block text-center py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0  peer"
													placeholder=" "
													value={ano_fab}
													maxLength={4}
													required
													onChange={handleChange("ano_fab")}
												/>
												<label className="absolute flex justify-center w-full floating_ano_fabricacao text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-placeholder-shown:text-[#ffae00] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Ano de Fabricação
												</label>
											</div>
											{/*  */}
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													// disabled={true}
													type="text"
													className="block text-center py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0  peer"
													placeholder=" "
													value={ano_mod}
													maxLength={4}
													required
													onChange={handleChange("ano_mod")}
												/>
												<label className="absolute flex justify-center w-full floating_ano_modelo text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-placeholder-shown:text-[#ffae00] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Ano de Modelo
												</label>
											</div>
											<div className="relative z-0 mb-8 w-full">
												{/*  */}
												<input
													// disabled={true}
													type="text"
													className="block text-center py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 peer"
													placeholder=" "
													value={cor}
													maxLength={10}
													required
													onChange={handleChange("cor")}
												/>
												<label className="absolute flex justify-center w-full floating_cor text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-placeholder-shown:text-[#ffae00] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Cor
												</label>
											</div>
										</div>

										{/*  */}
										<div className="grid xl:grid-cols-2 xl:gap-6">
											<div className="relative z-0 mb-4 w-full group">
												{/* Estilo */}

												{/*  */}
												<select
													data-te-select-init
													name="floating_estilo"
													id="floating_estilo"
													className="block text-center estilo py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 peer"
													placeholder=" "
													value={estilo}
													onChange={handleChange("estilo")}
												>
													<option className="text-gray-600" value="0">
														Selecionar...
													</option>
													<option className="text-gray-600" value="hatch">
														Hatch
													</option>
													<option className="text-gray-600" value="sendan">
														Sendan
													</option>
													{/* <option className="text-gray-600" value="suv">
														SUV
													</option> */}
												</select>
												<label
													htmlFor="floating_estilo"
													className="absolute flex justify-center w-full floating_estilo text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50"
												>
													Estilo
												</label>
											</div>
											{/*  */}
											<div className="relative z-10 mb-3 w-full group">
												{/* Combustivel */}
												<Select
													isMulti
													placeholder="Selecionar..."
													options={optionsCombustivel}
													styles={customStyles}
													onChange={(combustivelOptions) => {
														if (combustivelOptions.length <= 2) {
															setCombustivel(combustivelOptions);
															setCombustivel_alt(combustivelOptions);
														}
														if (combustivelOptions.length > 2) {
															toast.warn(
																"ATENÇÃO!! Você só pode selecionar duas opções de combustivel!",
																{
																	position: toast.POSITION.TOP_CENTER,
																}
															);
															return;
														}
														// setCombustivel(selectedOptions);
													}}
												/>

												<label
													data-te-select-label-ref
													htmlFor="floating_combustivel"
													className="absolute flex justify-center w-full floating_combustivel text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50"
												>
													Combustivel
												</label>
											</div>
										</div>
										{/*  */}

										<div className="grid container-1-5 xl:grid-cols-2 xl:gap-6">
											<div className="relative z-0 mt-4 w-full flex justify-center flex-col">
												{/* CRLV  */}
												<label
													onClick={crlv_label}
													className="crlv-label file w-full hover:bg-[#370350]  bg-[#53007A] py-0.5 hover:text-white cursor-pointer transition-all text-sm rounded-md text-white text-center"
												>
													Selecione o CRLV
												</label>
												<input
													type="file"
													name="crlv"
													id="floating_crlv"
													onChange={handleChange("crlv")}
													className="crlv px-0 w-full text-sm text-gray-200 bg-transparent dark:text-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
													placeholder=" "
												/>
												{/* Nome do arquivo selecionado */}
												<input
													value={crlvNome}
													disabled={true}
													className="flex justify-center text-gray-400 bg-transparent"
												/>
											</div>
											<div className="relative z-0 mt-4 w-full flex justify-center flex-col">
												{/* CRV */}
												<label
													onClick={crv_label}
													className="crv-label file w-full hover:bg-[#370350] bg-[#53007A] py-0.5 hover:text-white cursor-pointer transition-all text-sm rounded-md text-white text-center"
												>
													Selecione o CRV
												</label>
												<input
													type="file"
													name="crv"
													id="floating_crv"
													onChange={handleChange("crv")}
													className="crv "
													placeholder="CRV"
												/>
												<input
													value={crvNome}
													disabled={true}
													className="flex justify-center text-gray-400 bg-transparent"
												/>
											</div>
										</div>
										<div className="mt-4 flex relative right-0 top-0 justify-around">
											<button
												type="button"
												className="hover:bg-[#53007A] border-gray-400 hover:text-gray-100 cursor-pointer transition-all text-sm border rounded-md w-48 p-0.5"
												onClick={handleRegistration}
											>
												Cadastrar Veiculo
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
			{/* Modal quando retorna valor na rota */}
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={closeModal}>
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

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-3/4 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900 success text-center"
									>
										Foram encontrados dados no SINESP.
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-gray-500 text-md text-center">
											Gostaria de preencher os campos automaticamente?
										</p>
									</div>

									<div className="mt-4 flex justify-around">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModalPreencher}
										>
											Sim, gostaria!
										</button>
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModal}
										>
											Não, obrigado!
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Modal quando não há dados na rota */}
			<Transition appear show={nullOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={closeModal}>
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

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-3/4 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900 success text-center"
									>
										Não foram encontrados dados no SINESP.
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-gray-500 text-md text-center">
											Gostaria de prosseguir e preencher os campos manualmente?
										</p>
									</div>

									<div className="mt-4 flex justify-around">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModalNull}
										>
											Sim, gostaria!
										</button>
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModalReload}
										>
											Não, obrigado!
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
			{/* */}

			{/* Verificar arquivos CRLV */}
			<Transition appear show={verfyOpenCRLV} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-50"
					onClose={closeVerifyModalCRLV}
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

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className=" h-full w-full transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900 text-center"
									>
										CRLV Selecionado!
									</Dialog.Title>
									<div className="mt-2 h-full w-full relative flex justify-center">
										<embed
											style={{ width: "100%", height: "80vh" }}
											src={previewCRLV}
											type="application/pdf"
										/>
									</div>

									<div className="mt-4 flex justify-around">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeVerifyModalCRLV}
										>
											Fechar Modal!
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Verificar arquivos CRV */}
			<Transition appear show={verfyOpenCRV} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-50"
					onClose={closeVerifyModalCRV}
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

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className=" h-full w-full transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900 text-center"
									>
										CRV Selecionado!
									</Dialog.Title>
									<div className="mt-2 h-full w-full relative flex justify-center">
										<embed
											style={{ width: "100%", height: "80vh" }}
											src={previewCRV}
										/>
									</div>

									<div className="mt-4 flex justify-around">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeVerifyModalCRV}
										>
											Fechar Modal!
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
			{/*  */}
			<main class=" main w-full h-full min-h-screen align-middle justify-center flex flex-grow flex-col transition-all duration-150 ease-in md:ml-0">
				<div className="flex alt justify-center text-center text-lg text-[#370350] font-semibold m-5">
					<h1>Preencha os dados abaixo para continuar:</h1>
				</div>
				<form>
					<div class="bg-[#370350] relative w-full m-auto xl:w-2/5  px-4 py-10 sm:rounded-2xl sm:p-16">
						<div class="transition-all mx-auto">
							{/* Verificação Veiculo SINESP*/}

							<div className="grid xl:grid-cols-2 xl:gap-6">
								<div className="relative z-0 mb-4 w-full group">
									{/* Placa */}
									<input
										type="text"
										name="floating_placa"
										id="floating_placa"
										className="block text-center placa py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b border-gray-200 appearance-none dark:text-gray-200 dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer required:border-gray-900"
										placeholder=" "
										maxLength={7}
										value={placa}
										onChange={handleChange("placa")}
									/>
									<label
										htmlFor="floating_placa"
										className="absolute floating_placa flex justify-center w-full text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0]  peer-focus:left-0 peer-focus:text-gray-200 peer-focus:dark:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50"
									>
										Placa
									</label>
								</div>

								{/* --- */}
								<div className="relative z-0 mb-3 w-full group">
									{/* Renavam */}
									<input
										// hidden={false}
										type="text"
										name="floating_renavam"
										id="floating_renavam"
										className="block renavam text-center py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b border-gray-200 appearance-none dark:text-gray-200 dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
										placeholder=" "
										maxLength={11}
										value={renavam}
										onChange={handleChange("renavam")}
									/>
									<label
										htmlFor="floating_renavam"
										className="absolute floating_renavam flex justify-center w-full text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-focus:dark:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-0 peer-focus:scale-50"
									>
										Renavam
									</label>
								</div>
								{/*  */}
							</div>

							{/*  */}

							{/* Botões */}
							<div className="flex justify-center mt-7 ">
								<input
									type="button"
									value="Verificar"
									onClick={handleVerification}
									className="btt verify hover:bg-white hover:text-gray-900 cursor-pointer transition-all text-sm border rounded-md w-36 text-white"
								/>
								{/* <input
									type="button"
									value="Cadastrar"
									onClick={handleRegistration}
									className="btt cad hidden hover:bg-white hover:text-gray-900 cursor-pointer transition-all text-sm border rounded-md w-36 text-white"
								/> */}
							</div>

							{loading && (
								<div className="loader mt-5 relative flex justify-center items-center transition-all">
									<BarLoader color={"#fff"} loading={loading} size={30} />
								</div>
							)}
							{/* {showMessage && !loading && (
									<div className="text-gray-300 flex justify-center">
										Carregamento concluído!
									</div>
								)} */}
						</div>
					</div>
				</form>
				<ToastContainer autoClose={2500} />
			</main>
		</div>
	);
}

export default VeiculosCad;
