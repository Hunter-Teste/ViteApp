import { React, useState, useEffect, Fragment } from "react";
import { Link, useSubmit } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { BiCog, BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import axios from "axios";
import Menu from "../../menu/menu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/style/App.css";
import logo from "../../assets/img/logo_hunter.png";
//
function Motoristas() {
	// Dados pessoais
	const [nome, setNome] = useState("");
	const [cpf, setCpf] = useState("");
	const [email, setEmail] = useState("");
	const [telefone, setTelefone] = useState("");
	const [genero, setGenero] = useState("");
	const [data_nascimento, setDataNascimento] = useState("");
	const [idade, setIdade] = useState("");
	const [estado_civil, setEstadoCivil] = useState("");
	//Endereço
	const [cep, setCep] = useState("");
	const [endereco, setEndereco] = useState("");
	const [bairro, setBairro] = useState("");
	const [cidade, setCidade] = useState("");
	const [estado, setEstado] = useState("");
	// Documentos
	const [cnh, setCnh] = useState("");
	const [validade_cnh, setValidadeCnh] = useState("");
	const [observacoes_cnh, setObservacoesCnh] = useState("");
	const [comprovante_residencia, setComprovanteResidencia] = useState(null);
	const [antecedentes_criminais, setAntecedentesCriminais] = useState(null);
	//
	const [comprovante_residencia_nome, setComprovanteResidenciaNome] =
		useState(null);
	const [antecedentes_criminais_nome, setAntecedentesCriminaisNome] =
		useState(null);
	//
	const [banco, setBanco] = useState("");
	const [agencia, setAgencia] = useState("");
	const [tipo_conta, setTipoConta] = useState("");
	const [conta_corrente, setContaCorrente] = useState("");
	const [cpf_titular, setCpfTitular] = useState("");
	const [chave_pix, setChavePix] = useState("");
	//
	const [motoristas, setMotoristas] = useState([]);
	const [selectedMotorista, setSelectedMotorista] = useState(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);
	const [searchValue, setSearchValue] = useState("");
	//
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	//
	const cookies = new Cookies();
	const decoded = jwt_decode(cookies.get("token"));
	//
	const [id, setId] = useState("");
	//
	const [isDisabled, setIsDisabled] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [configHidden, setConfigHidden] = useState(true);
	//
	const formData = new FormData();
	//
	const submit = useSubmit();
	//
	let bt1 = document.querySelector(".bt-1");
	let bt2 = document.querySelector(".bt-2");
	let bt3 = document.querySelector(".bt-3");
	let bt4 = document.querySelector(".bt-4");
	let bt5 = document.querySelector(".bt-5");
	//
	let ct1 = document.querySelector(".ct-1");
	let ct2 = document.querySelector(".ct-2");
	let ct3 = document.querySelector(".ct-3");
	let ct4 = document.querySelector(".ct-4");
	//
	let tPessoais = document.querySelector(".dados-pessoais");
	let tEndereco = document.querySelector(".dados-endereco");
	let tDocumentos = document.querySelector(".dados-documentos");
	let tBancarios = document.querySelector(".dados-bancarios");
	let tRevisao = document.querySelector(".dados-revisao");
	// fetch veiculos
	useEffect(() => {
		axios.get(import.meta.env.VITE_APP_MOTORISTA_CAD_URL).then((response) => {
			setMotoristas(response.data);
		});
		//
		if (decoded.nv_acesso == 2) {
			setConfigHidden(false);
		}
		if (decoded.nv_acesso < 2) {
			setConfigHidden(true);
		}

		// highlight nav item
		document.querySelector(".mot").style.color = "rgb(168 85 247)";
		document.querySelector(".motMx").style.color = "rgb(168 85 247)";
	}, []);

	//
	const handleChange = (fieldName) => (event) => {
		switch (fieldName) {
			// Dados pessoais
			case "nome":
				setNome(event.target.value);
				break;
			case "cpf":
				setCpf(event.target.value.replace(/\D/g, ""));
				break;
			case "email":
				setEmail(event.target.value);
				break;
			case "telefone":
				setTelefone(event.target.value.replace(/\D/g, ""));
				break;
			case "genero":
				setGenero(event.target.value);
				break;
			case "data_nascimento":
				setDataNascimento(event.target.value);
				break;
			case "idade":
				setIdade(event.target.value.replace(/\D/g, ""));
				break;
			case "estado_civil":
				setEstadoCivil(event.target.value);
				break;
			// Dados bancarios
			case "cep":
				setCep(event.target.value);
				break;
			case "endereco":
				setEndereco(event.target.value);
				break;
			case "bairro":
				setBairro(event.target.value);
				break;
			case "cidade":
				setCidade(event.target.value);
				break;
			case "estado":
				setEstado(event.target.value);
				break;
			//Documentos
			case "cnh":
				setCnh(event.target.value);
				break;
			case "validade_cnh":
				setValidadeCnh(event.target.value);
				break;
			case "observacoes_cnh":
				setObservacoesCnh(event.target.value);
				break;
			case "comprovante_residencia":
				setComprovanteResidencia(event.target.files[0]);
				setComprovanteResidenciaNome(event.target.files[0].name);
				break;
			case "antecedentes_criminais":
				setAntecedentesCriminais(event.target.files[0]);
				setAntecedentesCriminaisNome(event.target.files[0].name);
				break;
			//
			case "banco":
				setBanco(event.target.value);
				break;
			case "agencia":
				setAgencia(event.target.value);
				break;
			case "tipo_conta":
				setTipoConta(event.target.value);
				break;
			case "conta_corrente":
				setContaCorrente(event.target.value);
				break;
			case "cpf_titular":
				setCpfTitular(event.target.value);
				break;
			case "chave_pix":
				setChavePix(event.target.value);
				break;
			//
			default:
				break;
		}
	};

	const calcIdade = () => {
		setIdade(moment().diff(moment(data_nascimento), "years"));
	};

	//
	// console.log("ID: " + id + " Placa: " + placa);
	// console.log(selectedVeiculo);
	//
	// calcula o índice inicial e final dos elementos a serem renderizados

	//Consultar veiculos
	const handleConsulta = () => {
		if (!id) {
			toast.warn("Por favor, selecione algum Motorista!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}
		setIsOpen(true);
		setIsDisabled(true);
		setIsHidden(true);
	};
	//
	const closeModal = () => {
		setIsOpen(false);
	};
	//
	const closeModalOut = () => {
		setIsOpen(true);
	};

	const buscaCep = async () => {
		try {
			const response = await axios.get(
				"https://viacep.com.br/ws/" + cep + "/json/"
			);
			console.log(response.data);
			setEndereco(response.data.logradouro);
			setBairro(response.data.bairro);
			setCidade(response.data.localidade);
			setEstado(response.data.uf);
		} catch (error) {
			console.log(error);
		}
	};
	//
	const cadMotorista = async () => {
		setLoading(true);
		// Valid Nome
		if (!nome) {
			setLoading(false);
			toast.warn("Por favor, preencha o campo NOME do motorista!!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}

		// Valid CPF
		if (!cpf) {
			setLoading(false);
			toast.warn("Por favor, preencha o campo CPF do motorista!!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}

		// Valid GENERO
		if (genero == 0) {
			setLoading(false);
			toast.warn("Por favor, selecione o GÊNERO do motorista!!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}

		// Valid Estado Civil
		if (estado_civil == 0) {
			setLoading(false);
			toast.warn("Por favor, selecione o ESTADO CIVIL do motorista!!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}

		// Valid Data de Nascimento
		if (!data_nascimento) {
			setLoading(false);
			toast.warn(
				"Por favor, preencha o campo DATA de NASCIMENTO do motorista!!",
				{
					position: toast.POSITION.TOP_CENTER,
				}
			);
			return;
		}

		// Valid Telefone
		if (!telefone) {
			setLoading(false);
			toast.warn("Por favor, preencha o campo TELEFONE do motorista!!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}

		// Valid Email
		if (!email) {
			setLoading(false);
			toast.warn("Por favor, preencha o campo EMAIL do motorista!!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}

		// Valid CEP
		if (!cep) {
			setLoading(false);
			toast.warn("Por favor, preencha o campo CEP do motorista!!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}

		// Valid bairro
		if (!bairro) {
			setLoading(false);
			toast.warn("Por favor, preencha o campo BAIRRO do motorista!!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}

		// Valid Endereço
		if (!endereco) {
			setLoading(false);
			toast.warn("Por favor, preencha o campo ENDEREÇO do motorista!!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}

		// Valid Cidade
		if (!cidade) {
			setLoading(false);
			toast.warn("Por favor, preencha o campo CIDADE do motorista!!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}

		// Valid Estado
		if (!estado) {
			setLoading(false);
			toast.warn("Por favor, preencha o campo ESTADO do motorista!!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}

		// Valid CNH
		if (!cnh) {
			setLoading(false);
			toast.warn("Por favor, preencha o campo CNH do motorista!!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}

		// Valid data validade CNH
		if (!validade_cnh) {
			setLoading(false);
			toast.warn("Por favor, preencha o campo Validade da CNH do motorista!!", {
				position: toast.POSITION.TOP_CENTER,
			});
			return;
		}

		//
		try {
			const formData = new FormData();

			const data = {
				nome,
				cpf,
				email,
				telefone,
				genero,
				data_nascimento,
				idade,
				estado_civil,
				cep,
				endereco,
				bairro,
				cidade,
				estado,
				comprovante_residencia,
				antecedentes_criminais,
				cnh,
				validade_cnh,
				observacoes_cnh,
				banco,
				agencia,
				tipo_conta,
				conta_corrente,
				cpf_titular,
				chave_pix,
			};

			Object.entries(data).forEach(([key, value]) => {
				if (value) {
					formData.append(key, value);
				}
			});

			const postMotorista = await axios.post(
				import.meta.env.VITE_APP_MOTORISTA_CAD_URL,
				formData
			);

			toast.success("Motorista cadastrado com sucesso", {
				position: toast.POSITION.TOP_CENTER,
			});

			console.log(postMotorista);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			// Trate o erro adequadamente, mostrando uma mensagem de erro para o usuário
			toast.error("ERRO:" + error, {
				position: toast.POSITION.TOP_CENTER,
			});
			console.error(error);
		}
	};
	//
	const handleSelectMotorista = (motorista) => {
		//
		setSelectedMotorista(motorista);
		setId(motorista.id);
		setNome(motorista.nome);
		setCpf(motorista.cpf);
		setGenero(motorista.genero);
		setEstadoCivil(motorista.estado_civil);
		setDataNascimento(
			motorista.data_nascimento
				.replace(/^(\d{4}-\d{2}-\d{2}).+$/, "$1")
				.split("-")
				.reverse()
				.join("-")
		);
		setIdade(motorista.idade);
		setTelefone(motorista.telefone);
		setEmail(motorista.email);
		//
		setCep(motorista.cep);
		setEndereco(motorista.endereco);
		setBairro(motorista.bairro);
		setCidade(motorista.cidade);
		setEstado(motorista.estado);
		//
		setCnh(motorista.cnh);
		setValidadeCnh(
			motorista.validade_cnh
				.replace(/^(\d{4}-\d{2}-\d{2}).+$/, "$1")
				.split("-")
				.reverse()
				.join("-")
		);
		setObservacoesCnh(motorista.observacoes_cnh);
		setComprovanteResidencia(motorista.comprovante_residencia);
		setAntecedentesCriminais(motorista.antecedentes_criminais);
		//
		setBanco(motorista.banco);
		setCpfTitular(motorista.cpf_titular);
		setAgencia(motorista.agencia);
		setTipoConta(motorista.tipo_conta);
		setContaCorrente(motorista.conta_corrente);
		setChavePix(motorista.chave_pix);
		//
		setMotoristas(
			motoristas.map((item) =>
				item.id === motorista.id
					? { ...item, selecionado: true }
					: { ...item, selecionado: false }
			)
		);
	};
	const handleEditarMotorista = () => {
		setIsOpen(true);
		setIsDisabled(false);
		setIsHidden(true);
	};
	// calcula o índice inicial e final dos elementos a serem renderizados
	const startIndex = currentPage * 4;
	const endIndex = Math.min(startIndex + 4, motoristas.length);

	// gera os números das páginas
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(motoristas.length / itemsPerPage); i++) {
		pageNumbers.push(i);
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
								<Dialog.Panel className="w-full h-full md:w-3/6  transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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

											{/* Revisão dos dados inseridos */}
											<h1 className="dados-revisao hidden">
												Por favor, revise os dados abaixo:
											</h1>
											{/* <h2 className="text-black"></h2> */}
										</div>
									</Dialog.Title>
									<div className="bg-white cad-scroll overflow-y-scroll transition-all rounded-md w-full h-[400px] p-10">
										{/* Dados Pessoais */}
										<div className="ct-1 transition-all origin-[0] transform scale-100 ">
											<div className="grid xl:grid-cols-2 xl:gap-6">
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={nome}
														onChange={handleChange("nome")}
														className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={80}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Nome
													</label>
												</div>
												{/*  */}
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={cpf}
														onChange={handleChange("cpf")}
														className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={20}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Cpf
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
														value={genero}
														onChange={handleChange("genero")}
														className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=""
														maxLength={60}
													/>

													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Gênero
													</label>
												</div>
												{/*  */}
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={estado_civil}
														onChange={handleChange("estado_civil")}
														className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=""
														maxLength={60}
													/>

													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Estado Civil
													</label>
												</div>
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={data_nascimento}
														onBlur={calcIdade}
														onChange={handleChange("data_nascimento")}
														className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={7}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Data de Nascimento
													</label>
												</div>
											</div>
											{/*  */}

											<div className="grid xl:grid-cols-3 xl:gap-6">
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={true}
														type="text"
														className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														value={idade}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Idade
													</label>
												</div>
												{/*  */}
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={telefone}
														onChange={handleChange("telefone")}
														className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={12}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Telefone
													</label>
												</div>
												{/*  */}
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={email}
														onChange={handleChange("email")}
														className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={60}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Email
													</label>
												</div>
											</div>
										</div>
										{/*  */}

										{/* Endereço */}
										<div className="ct-2 transition-all origin-[0] transform scale-100">
											<div className="grid xl:grid-cols-1 xl:gap-6">
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={cep}
														onBlur={buscaCep}
														className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														onChange={handleChange("cep")}
														placeholder=" "
														maxLength={10}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														CEP
													</label>
												</div>
												{/*  */}
											</div>
											{/*  */}
											<div className="grid xl:grid-cols-1 xl:gap-6">
												{/*  */}
												<div className="relative z-0 mb-8 w-full">
													<input
														disabled={isDisabled}
														type="text"
														value={endereco}
														onChange={handleChange("endereco")}
														className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={60}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Endereço
													</label>
												</div>
											</div>

											{/*  */}
											<div className="grid xl:grid-cols-3 xl:gap-6">
												{/*  */}
												<div className="relative z-0 mb-8 w-full">
													<input
														disabled={isDisabled}
														type="text"
														value={bairro}
														onChange={handleChange("bairro")}
														className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={20}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Bairo
													</label>
												</div>
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={cidade}
														onChange={handleChange("cidade")}
														className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={60}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Cidade
													</label>
												</div>
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={estado}
														onChange={handleChange("estado")}
														className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={20}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Estado
													</label>
												</div>
											</div>
										</div>

										{/* Documentos */}
										<div className="ct-3 transition-all origin-[0] transform scale-100">
											<div className="grid xl:grid-cols-2 xl:gap-6">
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={cnh}
														className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														onChange={handleChange("cnh")}
														placeholder=" "
														maxLength={20}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														CNH {cnh}
													</label>
												</div>
												{/*  */}
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={validade_cnh}
														className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														onChange={handleChange("validade_cnh")}
														placeholder=" "
														maxLength={10}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Validade da CNH
													</label>
												</div>
											</div>

											{/*  */}
											<div className="grid xl:grid-cols-1 xl:gap-6">
												<div className="relative z-0 mb-8 w-full">
													<input
														disabled={isDisabled}
														type="text"
														value={observacoes_cnh}
														onChange={handleChange("observacoes_cnh")}
														className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={60}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Observações da CNH
													</label>
												</div>
											</div>

											{/*  */}
											<div className="grid xl:grid-cols-2 xl:gap-6 mt-5">
												{/* Comprovante de Residência */}
												<div className="relative z-0 w-full">
													<label
														onClick={() => {
															window
																.open(comprovante_residencia)
																.target("_blank");
														}}
														className="block hover:bg-[#370350] bg-[#53007A] py-0.5 hover:text-white cursor-pointer transition-all text-sm rounded-md text-white text-center"
													>
														Visualizar Comrpovante de Residência
													</label>
												</div>
												{/* Antecedentes Criminais */}
												<div className="relative z-0  w-full">
													<label
														onClick={() => {
															window
																.open(antecedentes_criminais)
																.target("_blank");
														}}
														className=" block w-full hover:bg-[#370350] bg-[#53007A] py-0.5 hover:text-white cursor-pointer transition-all text-sm rounded-md text-white text-center"
													>
														Antecedentes Criminais
													</label>
												</div>
											</div>
										</div>

										{/* Dados Bancarios */}
										<div className="ct-4 transition-all origin-[0] transform scale-100">
											{/*  */}
											<div className="grid xl:grid-cols-2 xl:gap-6">
												{/*  */}
												<div className="relative z-0 mb-8 w-full">
													<input
														disabled={isDisabled}
														type="text"
														value={banco}
														onChange={handleChange("banco")}
														className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={60}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Banco
													</label>
												</div>
												{/*  */}
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={cpf_titular}
														onChange={handleChange("cpf_titular")}
														className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={20}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														CPF do Titular
													</label>
												</div>
											</div>
											{/*  */}
											<div className="grid xl:grid-cols-2 xl:gap-6">
												<div className="relative z-0 mb-8 w-full">
													<input
														disabled={isDisabled}
														type="text"
														value={agencia}
														onChange={handleChange("agencia")}
														className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={20}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Agência
													</label>
												</div>
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={tipo_conta}
														onChange={handleChange("tipo_conta")}
														className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={60}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Tipo de Conta
													</label>
												</div>
											</div>

											{/*  */}
											<div className="grid xl:grid-cols-2 xl:gap-6">
												{/*  */}

												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={conta_corrente}
														onChange={handleChange("conta_corrente")}
														className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={20}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Conta Corrente
													</label>
												</div>
												{/*  */}
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="text"
														value={chave_pix}
														onChange={handleChange("chave_pix")}
														className="block py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=" "
														maxLength={20}
													/>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Chave PIX
													</label>
												</div>
											</div>
										</div>

										<div className="mt-4 flex relative right-0 top-0 justify-around">
											{/* Botão 5 */}
											<button
												type="button"
												hidden={isHidden}
												className="hover:bg-[#53007A] bt-5 border-gray-400 hover:text-gray-100 cursor-pointer transition-all text-sm border rounded-md w-48 p-0.5"
												// onClick={cadMotorista}
											>
												Atualizar Cadastro
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
			{/*  */}
			<main className="main w-1/2 m-0 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0">
				<div className="flex col w-3/4 md:w-1/3 rounded-lg m-auto flex-col justify-center items-center">
					<div className=" w-full content-veic flex flex-col justify-center items-center">
						<table>
							<thead className="bg-[#370350] rounded-t-2xl w-full border-b border-[#53007A] flex justify-center h-16">
								<div className="flex w-full justify-around items-center">
									<label className="text-white font-semibold text-md uppercase tracking-wider">
										Motoristas Cadastrados
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
										className="p-4 v128 w-48 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
									>
										Nome
									</th>

									<th
										scope="col"
										className="p-4 v128 w-36 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
									>
										CPF
									</th>
									<th
										scope="col"
										className="p-4 v128 w-36 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
									>
										CNH
									</th>
									<th
										scope="col"
										className="p-4 v128 w-44 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
									>
										Email
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
							{motoristas
								.filter(
									(motorista) =>
										motorista.nome
											.toLowerCase()
											.includes(searchValue.toLowerCase()) ||
										motorista.cpf
											.toLowerCase()
											.includes(searchValue.toLowerCase()) ||
										motorista.email
											.toLowerCase()
											.includes(searchValue.toLowerCase())
								)
								.slice(startIndex, endIndex)
								.map((motorista) => (
									//  Listando veiculos cadastrados
									<div
										key={motorista.id}
										onClick={() => handleSelectMotorista(motorista)}
										className="border-b border-[#370350] p-0 bg-[#53007A] w-full flex justify-center"
									>
										{/* <h2>ID - Modelo - Placa</h2> */}
										<tr
											id={"tb" + motorista.id}
											// onClick={() => handleSelectVeiculo(veiculo)}
											className={`bg-[#53007A] p-5 ct-tr transition-all hover:bg-violet-900 cursor-pointer w-full flex justify-center items-center ${
												motorista.selecionado ? "bg-violet-900" : ""
											}`}
										>
											<th
												scope="col"
												className="p-4 w-16 v128 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
											>
												<input
													type={"checkbox"}
													checked={motorista.selecionado}
													onChange={() => handleSelectMotorista(veiculo)}
												/>
											</th>
											{/* PLACA */}
											<th
												scope="col"
												className="p-4 w-48 v128 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
											>
												{motorista.nome}
											</th>

											<th
												scope="col"
												className="p-4 w-36 v128 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
											>
												{motorista.cpf}
											</th>

											<th
												scope="col"
												className="p-4 w-36 v128 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
											>
												{motorista.cnh}
											</th>

											<th
												scope="col"
												className="p-4 w-44 v128 text-center text-xs font-medium text-gray-300 tracking-wider"
											>
												{motorista.email}
											</th>

											{/* Visualizar */}
											<th
												hidden={configHidden}
												scope="col"
												onClick={() => handleSelectMotorista(motorista)}
												className="p-0 w-20 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"
											>
												<button
													className="p-4 text-lg"
													onClick={handleEditarMotorista}
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
								{Array(Math.ceil(motoristas.length / 4))
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
				</div>

				{/*  */}
				<div className="flex justify-center mt-7 ">
					<input
						type="button"
						onClick={handleConsulta}
						value="Visualizar Motorista"
						className="btt cadastrar mx-2 bg-[#53007A] hover:bg-[#370350] cursor-pointer transition-all text-sm border rounded-md w-44 p-0.5 text-white"
					/>
					{/*  */}
					<Link to={"/motoristas/cadastro"}>
						<input
							type="button"
							value="Cadastrar Novo Motorista"
							className="btt consultar mx-2 p-0.5 bg-[#53007A] hover:bg-[#370350] cursor-pointer transition-all text-sm border rounded-md w-44 text-white"
						/>
					</Link>
				</div>
			</main>
			<ToastContainer autoClose={3000} />
		</div>
	);
}

export default Motoristas;
