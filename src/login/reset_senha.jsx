import { React, useState } from "react";
import { useSubmit, Link } from "react-router-dom";
import axios from "axios";
import { BarLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/App.css";
import logo from "../assets/img/logo_hunter_branca.png";

function Reset() {
	const [email, setEmail] = useState("");
	const [captcha, setCaptcha] = useState("");
	const [loading, setLoading] = useState(false);
	const submit = useSubmit();

	function validMail(resp) {
		console.log(resp.email);
		return resp.email === email;
	}
	async function postReset() {
		setLoading(true);
		const response = await axios.get(import.meta.env.VITE_APP_USUARIOS_URL);
		const data = response.data;
		const vDataMail = data.find(validMail);

		if (!vDataMail) {
			toast.warn(
				"Este email não consta como cadastrado. Por favor digite um email válido!",
				{
					position: toast.POSITION.TOP_CENTER,
				}
			);
			setLoading(false);
			return;
		}

		//reset de senha
		try {
			const postReset = await axios.post(
				import.meta.env.VITE_APP_RESET_URL,
				{
					email: email,
				},
				toast.success(
					"Um link para resetar sua senha foi enviado para o seu email!",
					{
						position: toast.POSITION.TOP_CENTER,
					}
					// setTimeout(() => {submit(null, {action: "/",});}, 4500)
				),
				setLoading(false)
			);
			setPost(postReset);

			return;
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	}

	const handleChange = (fieldName) => (e) => {
		switch (fieldName) {
			case "email":
				setEmail(e.target.value);
				break;
			default:
				break;
		}
	};

	const handleSubmit = (e) => {
		postReset();
		e.preventDefault();
	};
	return (
		<div className="bg-[#370350] w-full h-screen min-h-screen flex justify-center items-center">
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
								<span className="text-gray-300 text-center">
									Confirme seu e-mail para
									<br /> resetar sua senha.
								</span>
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

							{/* Botão Login */}
							<div className="flex justify-center mt-5">
								<input
									type="submit"
									value="Confirmar"
									className="btt hover:bg-white hover:text-gray-900 cursor-pointer transition-all text-sm border rounded-md w-full text-white"
								/>
							</div>
							{/* Senha e Cadastre-
                            se */}
							<div className="grid xl:grid-cols-1 xl:gap-6 w-full top-5 relative flex justify-center">
								<div className=" z-0 text-center fot">
									{/*  */}
									<Link to={"/"}>
										<a className=" cursor-pointer text-gray-400 hover:text-white transition-all">
											Voltar para login
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
			<ToastContainer autoClose={4000} />
		</div>
	);
}

export default Reset;
