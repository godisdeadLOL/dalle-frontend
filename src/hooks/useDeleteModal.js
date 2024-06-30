import { useState } from "preact/hooks"

export function useConfirmModal() {
	const [message, setMessage] = useState("")
	const [onConfirm, setOnConfirm] = useState(undefined)
	const [open, setOpen] = useState(false)

	const onClose = () => {
		setOpen(false)
	}

	const onOpen = (message, callback) => {
		setMessage(message)
		setOnConfirm(() => () => {
			callback()
			onClose()
		})
		setOpen(true)
	}

	return { open, message, onConfirm, onOpen, onClose }
}
