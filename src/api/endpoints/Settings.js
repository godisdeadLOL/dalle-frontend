import Stash from "@/api/Stash"
import { Config } from "@/api/schemas"
import OpenaiProvider from "../providers/OpenaiProvider"

class Settings {
	static init() {
		const config = new Config("", "")
		return Stash.set("config", config)
	}

	/**
	 * @returns {Promise<Config>}
	 */
	static async load() {
		const config = Stash.get("config")

		if (!!config) return config
		return Settings.init()
	}

	/**
	 * @param {Config} config
	 */
	static async update(config) {
		Stash.set("config", config)
	}

	/**
	 * @param {Config} config
	 */
	static async check(config) {
		try {
			return await OpenaiProvider.check(config)
		} catch {
			return false
		}
	}
}

export default Settings
