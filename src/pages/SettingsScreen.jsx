import { Button } from "@/components/Button"
import { Divider } from "@/components/Divider"
import { Input } from "@/components/Input"
import { Screen } from "./Screen"
import { Label } from "@/components/Label"
import { VStack } from "@/components/VStack"
import { useForm } from "@/hooks/useForm"
import { useEffect, useState } from "preact/hooks"
import Settings from "@/api/endpoints/Settings"

import * as toasts from "@/toasts"

export const SettingsScreen = ({ className = "" }) => {
	const [state, setState] = useState("default") // default -> loading -> error, success

	const { values, setValues, register } = useForm({
		base_url: "",
		api_key: "",
	})

	const onTestConnection = async () => {
		setState("loading")
		const status = await Settings.check(values)
		setState(status ? "success" : "error")
	}

	const onAccept = async () => {
		await Settings.update(values)
		toasts.success("Settings updated.")
	}

	useEffect(() => {
		Settings.load().then((config) => setValues(config))
	}, [])

	return (
		<Screen className={`justify-center max-w-2xl mx-auto py-16 ${className}`}>
			<Label>OpenAi Compaitable API</Label>
			<Input placeholder="https://api.openai.com/v1" {...register("base_url")} />

			<Label>Api Key</Label>
			<Input {...register("api_key")} type="password" />

			<Divider className="my-4" />

			{/* progress_activity, check_circle */}

			<VStack className="!gap-2">
				<Button
					onClick={onTestConnection}
					iconLeft={{ default: "link", loading: "progress_activity", success: "check_circle", error: "warning" }[state]}
					color={{ default: "plain", success: "accept", error: "cancel" }[state] || "plain"}
				>
					Test Connection
				</Button>
				<Button onClick={onAccept} iconLeft="check" color="primary">
					Accept
				</Button>
			</VStack>
		</Screen>
	)
}
