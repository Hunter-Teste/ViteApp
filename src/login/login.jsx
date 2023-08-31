import { React, useState, useEffect } from "react";
import { useSubmit, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { BarLoader } from "react-spinners";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ReCAPTCHA from "react-google-recaptcha";
import "../assets/style/App.css";
import logo from "../assets/img/logo_hunter_branca.png";

function Login() {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [loading, setLoading] = useState(false);
	// const [captcha, setCaptcha] = useState("");
	const submit = useSubmit();
	const cookies = new Cookies();
	//
	useEffect(() => {
		const logged = cookies.get("token");
		if (logged) {
			submit(null, {
				action: "/home",
			});
		}
	}, []);

	const handleChange = (fieldName) => (e) => {
		switch (fieldName) {
			case "email":
				setEmail(e.target.value);
				break;
			case "senha":
				setSenha(e.target.value);
			default:
				break;
		}
	};

	async function getUser() {
		setLoading(true);
		//
		try {
			const response = await axios.post(import.meta.env.VITE_APP_LOGIN, {
				email: email,
				senha: senha,
			});
			// Cookies
			if (response.status == 200) {
				cookies.set("token", response.data.token);
				//
				const decoded = jwt_decode(cookies.get("token"));
				// {
				// 	 expires: new Date(Date.now() + 3600000),
				// }
				if (decoded.nv_acesso == 0) {
					toast.error("Acesso não autorizado!", {
						position: toast.POSITION.TOP_CENTER,
					});
					setLoading(false);
					return;
				}

				setLoading(false);
				// redirecionar para home caso autenticado
				submit(null, {
					action: "/home",
				});
			}
			//
			setLoading(false);
		} catch (error) {
			console.error(error);
			if (error.message == "Request failed with status code 401") {
				toast.error("Email ou senha inválidos! Por favor, digite novamente.", {
					position: toast.POSITION.TOP_CENTER,
				});
			} else {
				toast.error(error + "", {
					position: toast.POSITION.TOP_CENTER,
				});
			}

			setLoading(false);
		}
	}

	const handleSubmit = (e) => {
		getUser();
		e.preventDefault();
	};
	return (
		<div className="bg-[#370350] w-full h-screen min-h-screen flex justify-center items-center">
			<form
				className=" rounded-md  p-10 "
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

							{/* Novo Consultor */}

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

							<div className="grid xl:grid-cols-1 xl:gap-6">
								<div className="relative z-0 mb-3 w-full group">
									{/* Senha */}
									<input
										type="password"
										name="floating_senha"
										id="floating_senha"
										className="block text-center py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b border-gray-200 appearance-none dark:text-gray-200 dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
										placeholder=" "
										maxLength={50}
										required
										value={senha}
										onChange={handleChange("senha")}
									/>
									<label
										htmlFor="floating_senha"
										className="absolute flex justify-center w-full text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-0 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200 peer-focus:dark:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-0"
									>
										Senha
									</label>
								</div>
							</div>
							{/* ReCaptcha */}

							{/* <div className="grid xl:grid-cols-1 xl:gap-6">
								<div className="relative z-0 mb-3 w-full group flex justify-center">
									<ReCAPTCHA
										sitekey={import.meta.env.VITE_APP_KEY}
										onChange={setCaptcha}
									/>
								</div>
							</div> */}
							{/* Botão Login */}
							<div className="flex justify-center mt-5">
								<input
									type="submit"
									value="Login"
									className="btt hover:bg-white hover:text-gray-900 cursor-pointer transition-all text-sm border rounded-md w-full text-white"
								/>
							</div>
							{/* Senha e Cadastre-se */}
							<div className="grid xl:grid-cols-2 xl:gap-6 w-full top-5 relative justify-center">
								<div className=" z-0 text-start fot">
									{/*  */}
									<Link to={"/reset"}>
										<a className=" cursor-pointer text-gray-400 hover:text-white transition-all">
											Esqueceu a senha?
										</a>
									</Link>
								</div>
								<div className=" z-0 text-end fot">
									{/*  */}
									<Link to={"/cadastro"}>
										<a className=" cursor-pointer text-gray-400 hover:text-white transition-all">
											Cadastre-se
										</a>
									</Link>
								</div>
							</div>
							{loading && (
								<div className="loader mt-6 relative flex justify-center items-center transition-all">
									<BarLoader color={"#fff"} loading={loading} size={30} />
								</div>
							)}
						</div>
					</div>
				</div>
			</form>
			<ToastContainer autoClose={3000} />
		</div>
	);
}

export default Login;
