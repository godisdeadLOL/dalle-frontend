import { VStack } from "@/components/VStack"

export const Screen = ({ onTouched=null, children = null, className = "" }) => {
	return <VStack onClick={onTouched} className={`relative min-h-screen ${className}`}>{children}</VStack>
}
