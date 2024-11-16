"use client"

import { FC } from "react"
import { Input } from "@/components/ui/input"

interface InputFieldProps {
	id: string
	label: string
	type: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	required?: boolean
}

const InputField: FC<InputFieldProps> = ({
	id,
	label,
	type,
	value,
	onChange,
	required,
}) => (
	<div>
		<Input
			id={id}
			type={type}
			value={value}
			onChange={onChange}
			required={required}
			placeholder={label}
		/>
	</div>
)

export default InputField
