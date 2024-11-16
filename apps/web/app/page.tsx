import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<div className="flex flex-col items-center">
				<h1 className="text-3xl font-bold">Tasks</h1>
				<Link href="/auth/signin">
					<Button
						variant="default"
						className="mt-4">
						Start managing tasks
					</Button>
				</Link>
			</div>
		</div>
	)
}
