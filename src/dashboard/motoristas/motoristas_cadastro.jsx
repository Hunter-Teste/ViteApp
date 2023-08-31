import { React, useState, useEffect, Fragment } from "react";
import { Link, useSubmit } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { CgClose } from "react-icons/cg";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Menu from "../../menu/menu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/style/App.css";
import logo from "../../assets/img/logo_hunter.png";
import logo_branca from "../../assets/img/logo_hunter_branca.png";
//
function MotoristasCad() {
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
	const [id_vinculo, setIdVinculo] = useState("");
	const [id_veiculo_vinculado, setIdVeiculoVinculado] = useState("");
	//
	const [motorista_vinculado, setMotoristaVinculado] = useState("");
	const [nome_motorista_vinculado, setNomeVinculado] = useState("");
	const [email_motorista_vinculado, setEmailVinculado] = useState("");
	const [cnh_motorista_vinculado, setCnhVinculado] = useState("");
	//
	const [veiculo_vinculado, setVeiculoVinculado] = useState("");
	//
	const [data_inicio, setDataInicio] = useState("");
	//
	const [motoristas, setMotoristas] = useState([]);
	//
	const [isOpen, setIsOpen] = useState(true);
	const [veicHidden, setVeicHidden] = useState(true);
	const [loading, setLoading] = useState(false);
	//
	const cookies = new Cookies();
	const decoded = jwt_decode(cookies.get("token"));
	const email_clb = decoded.email;
	//
	const [isDisabled, setIsDisabled] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [configHidden, setConfigHidden] = useState(true);
	//
	const [vinculoOpen, setVinculoOpen] = useState(false);
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

		setDataInicio(moment());

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
				setNomeVinculado(event.target.value);
				break;
			case "cpf":
				setCpf(event.target.value.replace(/\D/g, ""));
				setMotoristaVinculado(event.target.value.replace(/\D/g, ""));
				setIdVinculo(Date.now().toString() + cpf.toString().slice(0, 3));
				break;
			case "email":
				setEmail(event.target.value);
				setEmailVinculado(event.target.value);
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
				setCnhVinculado(event.target.value);
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
			case "veiculo_vinculado":
				setVeiculoVinculado(event.target.value.toUpperCase());
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
	const closeModal = () => {
		setIsOpen(false);
		// location.reload();
	};
	//
	const closeModalOut = () => {
		setIsOpen(true);
	};
	//
	const cadModal = () => {
		setIsOpen(true);
	};
	//
	const toCt2 = () => {
		//
		ct1.classList.add("scale-0");
		ct1.classList.remove("scale-100");
		//
		setTimeout(() => {
			ct1.classList.add("hidden");
			ct2.classList.remove("hidden");
		}, 200);
		//
		setTimeout(() => {
			tPessoais.classList.add("hidden");
			//
			tEndereco.classList.remove("hidden");
			//
			bt1.classList.add("hidden");
			bt2.classList.remove("hidden");
			//
			ct2.classList.remove("scale-0");
			ct2.classList.add("scale-100");
		}, 400);
	};

	const toCt3 = () => {
		ct2.classList.remove("scale-100");
		ct2.classList.add("scale-0");
		//
		setTimeout(() => {
			ct2.classList.add("hidden");
			ct3.classList.remove("hidden");
			// ct2.classList.remove("hidden");
		}, 200);
		//
		setTimeout(() => {
			tEndereco.classList.add("hidden");
			tDocumentos.classList.remove("hidden");
			//
			bt2.classList.add("hidden");
			bt3.classList.remove("hidden");
			//
			ct3.classList.remove("scale-0");
			ct3.classList.add("scale-100");
		}, 400);
	};
	//
	const toCt4 = () => {
		ct3.classList.remove("scale-100");
		ct3.classList.add("scale-0");
		//
		setTimeout(() => {
			ct3.classList.add("hidden");
			ct4.classList.remove("hidden");
			// ct2.classList.remove("hidden");
		}, 200);
		//
		setTimeout(() => {
			tDocumentos.classList.add("hidden");
			tBancarios.classList.remove("hidden");
			//
			bt3.classList.add("hidden");
			bt4.classList.remove("hidden");
			//
			ct4.classList.remove("scale-0");
			ct4.classList.add("scale-100");
		}, 400);
	};
	//
	const toRevisar = () => {
		tBancarios.classList.add("hidden");
		tRevisao.classList.remove("hidden");
		// ct2.classList.remove("hidden");
		//
		ct1.classList.remove("hidden");
		ct2.classList.remove("hidden");
		ct3.classList.remove("hidden");
		//
		ct1.classList.remove("hidden");
		ct2.classList.remove("hidden");
		ct3.classList.remove("hidden");
		setTimeout(() => {
			//
			bt4.classList.add("hidden");
			bt5.classList.remove("hidden");
			//
			ct1.classList.add("scale-100");
			ct1.classList.remove("scale-0");
			//
			ct2.classList.add("scale-100");
			ct2.classList.remove("scale-0");
			//
			ct3.classList.add("scale-100");
			ct3.classList.remove("scale-0");
			//
			ct4.classList.add("scale-100");
			ct4.classList.remove("scale-0");
		}, 200);
	};
	//
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
		//
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
			const response = await axios.get(
				import.meta.env.VITE_APP_VEICULO_CAD_URL + veiculo_vinculado
			);
			const dataV = response.data[0];

			setIdVeiculoVinculado(dataV.id);
			//
			//
			// setModeloVinculado(dataV.modelo);
			// setFabricanteVinculado(dataV.fabricante);
			// setRenavamVinculado(dataV.renavam);
			// setChassiVinculado(dataV.chassi);
			//
			const formData = new FormData();

			//
			if (!veiculo_vinculado) {
				const data = {
					email_clb,
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
			}
			//
			if (veiculo_vinculado) {
				//
				const data = {
					email_clb,
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
					id_vinculo,
					id_veiculo_vinculado,
					veiculo_vinculado,
				};

				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						formData.append(key, value);
					}
				});
				//
				const putVinculo = await axios.put(
					import.meta.env.VITE_APP_VEICULO_CAD_URL + veiculo_vinculado,
					{
						id_vinculo: id_vinculo,
						motorista_vinculado: motorista_vinculado,
						veiculo_vinculado,
					}
				);
				console.log(putVinculo);

				const postMotorista = await axios.post(
					import.meta.env.VITE_APP_MOTORISTA_CAD_URL,
					formData
				);
				console.log(postMotorista);

				//
				const postVinculo = await axios.post(
					import.meta.env.VITE_APP_VINCULO_CAD_URL,
					{
						id_vinculo: id_vinculo,
						id_veiculo_vinculado: id_veiculo_vinculado,
						motorista_vinculado: motorista_vinculado,
						nome_motorista_vinculado: nome_motorista_vinculado,
						email_motorista_vinculado: email_motorista_vinculado,
						cnh_motorista_vinculado: cnh_motorista_vinculado,
						veiculo_vinculado: veiculo_vinculado,
						//
						modelo_veiculo_vinculado: dataV.modelo,
						fabricante_veiculo_vinculado: dataV.fabricante,
						renavam_veiculo_vinculado: dataV.renavam,
						chassi_veiculo_vinculado: dataV.chassi,
						data_inicio: data_inicio,
						email_clb: email_clb,
					}
				);
				console.log(postVinculo);
				//
				toast.success("Motorista cadastrado com sucesso", {
					position: toast.POSITION.TOP_CENTER,
				});
				setTimeout(() => {
					submit(null, { action: "/motoristas" });
				}, 3500);
			}

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

	const cadVinculo = () => {
		//
		setVinculoOpen(true);
	};

	const closeCadModal = () => {
		setVinculoOpen(false);
		setVeicHidden(true);
		setVeiculoVinculado("");
	};

	const vincular = async () => {
		if (!veiculo_vinculado) {
			alert("Digite a placa de um veiculo!!!");
			return;
		}
		try {
			const response = await axios.get(
				import.meta.env.VITE_APP_VEICULO_CAD_URL + veiculo_vinculado
			);
			const data = response.data[0];
			//
			if (!data) {
				toast.warn("Veiculo não cadastrado!!", {
					position: toast.POSITION.TOP_CENTER,
				});
				return;
			}
			if (data.id_vinculo) {
				toast.error("VEICULO JA VINCULADO!!!", {
					position: toast.POSITION.TOP_CENTER,
				});
				return;
			}
			if (!data.id_vinculo) {
				toast.success(
					"Após a conclusão do cadastro do motorista, o veículo selecionado será vinculado!",
					{
						position: toast.POSITION.TOP_CENTER,
					}
				);
				setIdVeiculoVinculado(data.id);
				setVeicHidden(false);
				setVinculoOpen(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-full h-full min-h-screen flex justify-center items-center">
			<sidebar className=" w-12">
				<div className="h-full fixed top-0 left-0 bottom-0">
					<Menu />
				</div>
			</sidebar>

			{/* Modal de Vincular veiculo */}
			<Transition appear show={vinculoOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={closeModalOut}>
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
										className="text-lg h-16 flex items-end justify-center font-medium leading-6 text-gray-900 success text-center"
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
										<h1>Digite a placa do veículo que deseja vincular:</h1>
									</Dialog.Title>
									<div className="mt-2">
										<div className="grid xl:grid-cols-1 xl:gap-6">
											<div className="relative z-0 mt-8 mb-8 w-full">
												{/*  */}
												<input
													disabled={isDisabled}
													type="text"
													value={veiculo_vinculado}
													onChange={handleChange("veiculo_vinculado")}
													className="block uppercase py-2.5 text-center px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
													placeholder=" "
													maxLength={11}
												/>
												<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
													Placa
												</label>
											</div>
										</div>
									</div>

									<div className="mt-4 flex justify-around">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={vincular}
										>
											Vincular!
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Visualização Veiculo Cadastrado */}

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-40 w-screen"
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
											{/* Dados pessoais */}
											<h1 className="dados-pessoais">
												Vamos começar inserindo os dados do motorista:
											</h1>
											{/* Endereço */}
											<h1 className="dados-endereco hidden">
												Agora insira o endereço do motorista:
											</h1>
											{/* Documentos */}
											<h1 className="dados-documentos hidden">
												Agora insira os documentos do Motorista:
											</h1>
											{/* Dados Bancários */}
											<h1 className="dados-bancarios hidden">
												Agora insira os dados bancários do Motorista:
											</h1>
											{/* Revisão dos dados inseridos */}
											<h1 className="dados-revisao hidden">
												Por favor, revise os dados abaixo:
											</h1>
											{/*  */}
											<p
												hidden={veicHidden}
												className="text-gray-500 uppercase font-semibold tracking-widest text-sm"
											>
												Veiculo Vinculado: {veiculo_vinculado}
											</p>
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
														maxLength={11}
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
													<select
														disabled={isDisabled}
														type="text"
														value={genero}
														onChange={handleChange("genero")}
														className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=""
														maxLength={60}
													>
														<option value={0}>Selecione...</option>
														<option value={"masculino"}>Masculino</option>
														<option value={"feminino"}>Feminino</option>
														<option value={"outro"}>Outro</option>
													</select>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Gênero
													</label>
												</div>
												{/*  */}
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<select
														disabled={isDisabled}
														type="text"
														value={estado_civil}
														onChange={handleChange("estado_civil")}
														className="block py-2.5 px-0 text-center w-full text-sm text-gray-900 bg-transparent border-0 border-b appearance-none dark:text-[#370350] dark:border-gray-400 dark:focus:border-[#53007A] focus:outline-none focus:ring-0 focus:border-blue-900 peer"
														placeholder=""
														maxLength={60}
													>
														<option value={0}>Selecione...</option>
														<option value={"solteiro(a)"}>Solteiro(a)</option>
														<option value={"casado(a)"}>Casado(a)</option>
														<option value={"divorciado(a)"}>
															Divorciado(a)
														</option>
														<option value={"viuvo(a)"}>Viúvo(a)</option>
													</select>
													<label className="absolute text-sm flex justify-center w-full text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[center] peer-placeholder-shown:origin-[0] peer-focus:left-0 peer-focus:dark:text-[#53007A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50">
														Estado Civil
													</label>
												</div>
												<div className="relative z-0 mb-8 w-full">
													{/*  */}
													<input
														disabled={isDisabled}
														type="date"
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
										<div className="ct-2 hidden transition-all origin-[0] transform scale-0">
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
										<div className="ct-3 hidden transition-all origin-[0] transform scale-0">
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
														type="date"
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
															document
																.querySelector(".comprovante_residencia")
																.click();
														}}
														className="block hover:bg-[#370350] bg-[#53007A] py-0.5 hover:text-white cursor-pointer transition-all text-sm rounded-md text-white text-center"
													>
														Comrpovante de Residência
													</label>
													<input
														type="file"
														// value={comprovante_residencia}
														onChange={handleChange("comprovante_residencia")}
														className="comprovante_residencia"
													/>
													{/*  */}
													<input
														value={comprovante_residencia_nome}
														disabled={true}
														className="flex justify-center text-gray-400 bg-transparent"
													/>
												</div>
												{/* Antecedentes Criminais */}
												<div className="relative z-0  w-full">
													<label
														onClick={() => {
															document
																.querySelector(".antecedentes_criminais")
																.click();
														}}
														className=" block w-full hover:bg-[#370350] bg-[#53007A] py-0.5 hover:text-white cursor-pointer transition-all text-sm rounded-md text-white text-center"
													>
														Antecedentes Criminais
													</label>
													<input
														type="file"
														// value={antecedentes_criminais}
														onChange={handleChange("antecedentes_criminais")}
														className="antecedentes_criminais"
													/>
													{/*  */}
													<input
														value={antecedentes_criminais_nome}
														disabled={true}
														className="flex justify-center text-gray-400 bg-transparent"
													/>
												</div>
											</div>
										</div>

										{/* Dados Bancarios */}
										<div className="ct-4 hidden transition-all origin-[0] transform scale-0">
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
											{/* Botão Vincular Veiculo */}
											<button
												type="button"
												hidden={isHidden}
												className="hover:bg-[#53007A] border-gray-400 hover:text-gray-100 cursor-pointer transition-all text-sm border rounded-md w-48 p-0.5"
												onClick={cadVinculo}
											>
												Vincular Veiculo
											</button>

											{/* Botão 1 */}
											<button
												type="button"
												hidden={isHidden}
												className="hover:bg-[#53007A] bt-1 border-gray-400 hover:text-gray-100 cursor-pointer transition-all text-sm border rounded-md w-48 p-0.5"
												onClick={toCt2}
											>
												Avançar
											</button>

											{/* Botão 2 */}
											<button
												type="button"
												hidden={isHidden}
												className="hover:bg-[#53007A] hidden bt-2 border-gray-400 hover:text-gray-100 cursor-pointer transition-all text-sm border rounded-md w-48 p-0.5"
												onClick={toCt3}
											>
												Avançar
											</button>
											{/* Botão 3 */}
											<button
												type="button"
												hidden={isHidden}
												className="hover:bg-[#53007A] hidden bt-3 border-gray-400 hover:text-gray-100 cursor-pointer transition-all text-sm border rounded-md w-48 p-0.5"
												onClick={toCt4}
											>
												Avançar
											</button>
											{/* Botão 4 */}
											<button
												type="button"
												hidden={isHidden}
												className="hover:bg-[#53007A] hidden bt-4 border-gray-400 hover:text-gray-100 cursor-pointer transition-all text-sm border rounded-md w-48 p-0.5"
												onClick={toRevisar}
											>
												Avançar e Revisar
											</button>
											{/* Botão 5 */}
											<button
												type="button"
												hidden={isHidden}
												className="hover:bg-[#53007A] hidden bt-5 border-gray-400 hover:text-gray-100 cursor-pointer transition-all text-sm border rounded-md w-48 p-0.5"
												onClick={cadMotorista}
											>
												Cadastrar
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
				<div className="flex col w-3/4 md:w-1/3 h-80 rounded-lg m-auto bg-[#370350] flex-col justify-center items-center">
					<img
						// onClick={closeModalOut}
						src={logo_branca}
						className=" mb-0"
						width="250"
						alt="logo"
					/>
					<h1 className="text-white text-center text-lg">
						Cadastro de Motoristas
					</h1>
				</div>

				{/*  */}
				<div className="flex justify-center mt-7 ">
					<Link to={"/motoristas"}>
						<input
							type="button"
							value="Voltar"
							className="btt cadastrar mx-2 bg-[#53007A] hover:bg-[#370350] cursor-pointer transition-all text-sm border rounded-md w-44 p-0.5 text-white"
						/>
					</Link>
					{/*  */}
					<input
						type="button"
						value="Cadastrar Novo Motorista"
						onClick={cadModal}
						className="btt consultar mx-2 p-0.5 bg-[#53007A] hover:bg-[#370350] cursor-pointer transition-all text-sm border rounded-md w-44 text-white"
					/>
				</div>
			</main>
			<ToastContainer autoClose={3000} />
		</div>
	);
}

export default MotoristasCad;
