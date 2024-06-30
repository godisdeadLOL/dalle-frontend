import { VStack } from "@/components/VStack"

export const Screen = ({ children = null, className = "" }) => {
	return <VStack className={`relative min-h-screen ${className}`}>{children}</VStack>
}
