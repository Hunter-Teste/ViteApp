import React, { useState, useEffect } from "react";
import { useSubmit, Link } from "react-router-dom";
import axios from "axios";
import { BarLoader } from "react-spinners";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ReCAPTCHA from "react-google-recaptcha";
import "../assets/style/App.css";
import logo from "../assets/img/logo_hunter_branca.png";

function Cadastro() {
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [cel, setCel] = useState("");
	const [dpt, setDpt] = useState(0);
	const [loading, setLoading] = useState(false);
	const [captcha, setCaptcha] = useState("");
	//Constante do encento de rota
	const submit = useSubmit();
	const cookies = new Cookies();

	const notifySuccess = () => {
		toast.success(
			"Cadastro efetuado com sucesso! Um link foi enviado para seu email, para efetuar a criação da sua senha.",
			{
				position: toast.POSITION.TOP_CENTER,
			}
		);
	};
	const notifyWarnMail = () => {
		toast.warn("Email já cadastrado. Por favor digite um email válido!", {
			position: toast.POSITION.TOP_CENTER,
		});
	};
	const notifyWarnCel = () => {
		toast.warn("Celular já cadastrado. Por favor digite um celular válido!", {
			position: toast.POSITION.TOP_CENTER,
		});
	};
	const notifyWarnDpt = () => {
		toast.warn("Por favor escolha um departamento!", {
			position: toast.POSITION.TOP_CENTER,
		});
	};

	useEffect(() => {
		const logged = cookies.get("token");
		if (logged) {
			submit(null, {
				action: "/home",
			});
		}
	}, []);

	//
	function validMail(resp) {
		return resp.email === email;
	}

	function validCel(resp) {
		return resp.cel === cel.replace(/[^0-9]/g, "");
	}

	function validNome(resp) {
		console.log(resp.nome);
		return resp.nome === nome;
	}

	async function postUser() {
		//
		try {
			setLoading(true);
			//
			const response = await axios.get(import.meta.env.VITE_APP_USUARIOS_URL);
			const data = response.data;

			const vDataMail = data.find(validMail);
			const vDataCel = data.find(validCel);
			const dataNome = data.find(validNome);
			if (dataNome) {
				console.log("existe");
			}
			if (vDataMail) {
				notifyWarnMail();
				setLoading(false);
				return;
			}
			if (vDataCel) {
				notifyWarnCel();
				setLoading(false);
				return;
			}
			if (dpt == 0) {
				notifyWarnDpt();
				setLoading(false);
				return;
			}
			//
			var pass = "";
			var str =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
				"abcdefghijklmnopqrstuvwxyz0123456789@#$";
			let i;
			//
			for (i = 1; i <= 16; i++) {
				var char = Math.floor(Math.random() * str.length + 1);
				pass += str.charAt(char);
			}

			// return pass;
			const postUser = await axios.post(import.meta.env.VITE_APP_USUARIOS_URL, {
				nome: nome,
				email: email,
				cel: cel.replace(/[^0-9]/g, ""),
				dpt: dpt,
				senha: pass,
			});
			console.log(postUser);
			// setPost(postUser);
		} catch (error) {
			console.error(error);
			setLoading(false);
			return;
		}

		//Envio do email
		try {
			const postMail = await axios.post(
				import.meta.env.VITE_APP_SEND_URL,
				{
					nome: nome,
					email: email,
				},
				notifySuccess(),
				setTimeout(() => {
					submit(null, { action: "/" });
				}, 5500)
			);

			console.log(postMail);
			setPost(postMail.data);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	}

	const handlePhone = (event) => {
		let input = event.target;
		input.value = mask(input.value);
	};

	const mask = (value) => {
		if (!value) return "";
		value = value.replace(/\D/g, "");
		value = value.replace(/(\d{2})(\d)/, "($1) $2");
		value = value.replace(/(\d)(\d{4})$/, "$1-$2");
		return value;
	};

	const handleChange = (fieldName) => (e) => {
		switch (fieldName) {
			case "nome":
				setNome(e.target.value);
				break;
			case "email":
				setEmail(e.target.value);
				break;
			case "cel":
				setCel(e.target.value);
				break;
			case "dpt":
				setDpt(e.target.value);
				break;
			default:
				break;
		}
	};

	//
	const handleSubmit = (e) => {
		postUser();
		e.preventDefault();
	};

	return (
		<div className="bg-[#370350] w-full h-full min-h-screen flex justify-center items-center">
			<form
				className=" rounded-md   p-10 "
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<div class="relative py-3 sm:max-w-xl sm:mx-auto">
					<div class="absolute inset-0 bg-gradient-to-r bg-white shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
					<div class="relative px-4 py-10 bg-[#53007A] shadow-lg sm:rounded-3xl sm:p-20">
						<div class="max-w-md mx-auto">
							<div className="flex flex-col justify-center items-center m-5">
								<img src={logo} className=" mb-0 " width="250" alt="logo" />
							</div>

							<div className="grid xl:grid-cols-1 xl:gap-6">
								<div className="relative z-0 mb-4 w-full group">
									{/* Nome */}
									<input
										type="nome"
										name="floating_nome"
										id="floating_nome"
										className="block text-center py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b border-gray-200 appearance-none dark:text-gray-200 dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
										placeholder=" "
										maxLength={80}
										required
										value={nome}
										onChange={handleChange("nome")}
									/>
									<label
										htmlFor="floating_nome"
										className="absolute flex justify-center w-full text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-0 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-focus:dark:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-0 "
									>
										Nome
									</label>
								</div>
							</div>

							{/*  */}

							<div className="grid xl:grid-cols-1 xl:gap-6">
								<div className="relative z-0 mb-4 w-full group">
									{/* Email */}
									<input
										type="email"
										name="floating_email"
										id="floating_email"
										className="block text-center py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b border-gray-200 appearance-none dark:text-gray-200 dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
										placeholder=" "
										maxLength={80}
										required
										value={email}
										onChange={handleChange("email")}
									/>
									<label
										htmlFor="floating_email"
										className="absolute flex justify-center w-full text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-0 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-focus:dark:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-0"
									>
										Email
									</label>
								</div>
							</div>
							{/*  */}
							<div className="grid xl:grid-cols-1 xl:gap-6">
								<div className="relative z-0 mb-3 w-full group">
									{/* Celular */}
									<input
										type="tel"
										name="floating_cel"
										id="floating_cel"
										className="block text-center py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b border-gray-200 appearance-none dark:text-gray-200 dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
										placeholder=" "
										maxLength={15}
										required
										value={cel}
										onKeyUp={handlePhone}
										onChange={handleChange("cel")}
									/>
									<label
										htmlFor="floating_cel"
										className="absolute flex justify-center w-full text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-0 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-focus:dark:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-0"
									>
										Celular
									</label>
								</div>
							</div>

							{/* Departamento */}
							<div className="grid xl:grid-cols-1 xl:gap-6">
								<div className="relative z-0 mb-3 w-full group">
									{/* Dpt */}
									<select
										name="floating_dpt"
										id="floating_dpt"
										className="block text-center py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b border-gray-200 appearance-none dark:text-gray-200 dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white"
										placeholder=" "
										required
										value={dpt}
										onChange={handleChange("dpt")}
									>
										<option className="text-gray-600" value="0">
											Selecione o Departamento...
										</option>
										<option className="text-gray-600" value="comercial">
											Comercial
										</option>
										<option className="text-gray-600" value="operacional">
											Operacional
										</option>
										<option className="text-gray-600" value="admnistrativo">
											Admnistrativo
										</option>
										<option className="text-gray-600" value="financeiro">
											Financeiro
										</option>
										<option className="text-gray-600" value="tecnologia">
											Tecnologia
										</option>
									</select>
								</div>
							</div>

							{/* ReCaptcha */}
							{/* <div className="grid xl:grid-cols-1 xl:gap-6">
								<div className="relative z-0 mb-3 w-full group flex justify-center">
									<ReCAPTCHA sitekey={import.meta.env.VITE_APP_KEY} onChange={setCaptcha} />
								</div>
							</div> */}

							{/* Botão Login */}
							<div className="flex justify-center mt-5">
								<input
									type="submit"
									value="Cadastrar"
									className="btt hover:bg-white hover:text-gray-900 cursor-pointer transition-all text-sm border rounded-md w-full text-white"
								/>
							</div>

							{/* Senha e Cadastre-se */}
							<div className="grid xl:grid-cols-1 xl:gap-6 w-full top-5 relative flex justify-center">
								<div className=" z-0 text-center fot">
									{/*  */}
									<Link to={"/"}>
										<a className=" cursor-pointer text-gray-400 hover:text-white transition-all">
											Já possuo uma conta!
										</a>
									</Link>
								</div>
							</div>
							{loading && (
								<div className="loader mt-5 relative flex justify-center items-center transition-all">
									<BarLoader color={"#fff"} loading={loading} size={30} />
								</div>
							)}
						</div>
					</div>
				</div>
			</form>
			<ToastContainer autoClose={5000} />
		</div>
	);
}

export default Cadastro;
