export async function checkResponse(response) {
	if (!response.ok) {
		const body = await response.json()
		throw new Error(body?.error?.message || body?.error?.code || body?.detail || "Generation error")
	}
}

export async function timeout(promise, timeout) {
	return await Promise.race([promise, new Promise((resolve, reject) => setTimeout(() => reject(new Error("Timeout")), timeout * 1000))])
}
