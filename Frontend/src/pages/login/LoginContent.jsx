import LoginForm from "./components/LoginForm";

export default function LoginContent({ setAuth, darkModeButton }) {
	return (
		<main>
			<LoginForm setAuth={setAuth} darkModeButton={darkModeButton} />
		</main>
	);
}
