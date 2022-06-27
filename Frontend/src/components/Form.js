export default function Form() {
	const [text, setText] = React.useState("");

	const handleChange = (event) => {
		setText(event.target.value);
	};

	return (
		<Fragment>
			<TextField
				label="Outlined"
				variant="outlined"
				value={text}
				onChange={handleChange}
			/>
			<Button
				onClick={() => {
					console.log(text);
				}}
			>
				Submit
			</Button>
		</Fragment>
	);
}
