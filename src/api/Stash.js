import { v4 as uuid4 } from "uuid"

class Stash {
	/**
	 * @param {string} key
	 * @returns {any}
	 */
	static get(key, base = null) {
		const data = localStorage.getItem(key)
		return data ? JSON.parse(data) : base
	}

	/**
	 * @param {string} key
	 * @param {any} value
	 * @returns {any}
	 */
	static set(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
		return value
	}

	/**
	 * @param {string} key
	 * @param {any} value
	 * @returns {any}
	 */
	static append(key, value) {
		const data = this.get(key, [])
		value.id = uuid4()
		data.push(value)
		this.set(key, data)
		return value
	}

	/**
	 * @param {string} key
	 * @param {any} id
	 * @returns {any}
	 */
	static delete(key, id) {
		const data = this.get(key, [])
		const newData = data.filter((item) => item.id !== id)
		this.set(key, newData)
		return newData
	}
}

export default Stash
