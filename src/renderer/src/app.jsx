import {
	Button,
	Card,
	CardBody,
	Checkbox,
	CheckboxGroup,
	Snippet,
	Slider,
	Radio,
	RadioGroup,
} from "@nextui-org/react";
import { Check, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { generatePassword } from "./generate-password";

export default function App() {
	const [copiedToClip, setCopiedToClip] = useState(false);

	const [passwordChars, setPasswordChars] = useState([
		"minor",
		"major",
		"numeros",
		"symbols",
	]);
	const [passwordType, setPasswordType] = useState(1);
	const [passwordSize, setPasswordSize] = useState(10);

	const [generatedPassword, setGeneratedPassword] = useState("");

	function generateNewPassword() {
		setGeneratedPassword(
			generatePassword(passwordChars, passwordType, passwordSize)
		);
		setCopiedToClip(false);
	}

	useEffect(() => {
		generateNewPassword()
	}, [passwordChars, passwordType, passwordSize]);

	return (
		<main className="h-screen w-screen flex flex-col items-center gap-4 p-5">
			<div className="w-full flex gap-2">
				<Snippet
					onCopy={() => setCopiedToClip(true)}
					className="w-full"
					classNames={{
						base: "overflow-hidden relative",
						pre: "max-w-full flex-grow whitespace-nowrap overflow-hidden text-ellipsis px-2",
						copyButton: "absolute top-1 right-1",
					}}
					symbol=""
					color="success"
					size="lg"
				>
					{generatedPassword}
				</Snippet>
				<Button onClick={generateNewPassword} isIconOnly size="lg" variant="bordered" color="default">
					<RotateCcw />
				</Button>
			</div>
			<Card className="w-full">
				<CardBody className="space-y-4">
					<div className="w-full flex gap-2 items-center">
						<span className="text-sm text-zinc-600 font-bold">6</span>
						<Slider
							value={passwordSize}
							onChange={setPasswordSize}
							showTooltip={true}
							showSteps
							defaultValue={10}
							minValue={6}
							maxValue={64}
						/>
						<span className="text-sm text-zinc-600 font-bold">64</span>
					</div>
					<div className="flex flex-col gap-6">
						<span className="text-lg text-zinc-600 font-semibold">
							Configuração da senha
						</span>

						<RadioGroup
							value={passwordType.toString()}
							onValueChange={(value) => setPasswordType(+value)}
							defaultValue="1"
							orientation="horizontal"
						>
							<Radio value="1">Vale tudo</Radio>
							<Radio value="2">Tira caracteres confusos</Radio>
						</RadioGroup>

						<CheckboxGroup
							orientation="horizontal"
							color="primary"
							value={passwordChars}
							onValueChange={setPasswordChars}
						>
							<Checkbox value="minor">letras minusculas</Checkbox>
							<Checkbox value="major">LETRAS MAIÚSCULAS</Checkbox>
							<Checkbox value="numbers">Núm3er0s</Checkbox>
							<Checkbox value="symbols">!$@&*%</Checkbox>
						</CheckboxGroup>
					</div>
				</CardBody>
			</Card>
			<Button
				startContent={copiedToClip ? <Check /> : null}
				onClick={() => {
					navigator.clipboard.writeText(generatedPassword);
					setCopiedToClip(true);
				}}
				className="w-full"
				size="lg"
				color={copiedToClip ? "success" : "primary"}
			>
				{copiedToClip ? "Senha copiada" : "Copiar Senha"}
			</Button>
		</main>
	);
}
