import { Button } from "@/ui/button"
import Image from "next/image"
import Link from "next/link"

const Home = () => {
	return (
		<>
			<div className="flex size-full">
				<div className="flex flex-col w-full flex-1 max-w-7xl mx-auto items-center justify-center px-4 py-2">
					<div className="grid grid-cols-1 flex-1 md:grid-cols-2 gap-4">
						<div className="flex flex-col gap-6 md:gap-8 w-full items-start justify-center">
							<div className="flex flex-col gap-4 w-fit">
								<h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-gray-50">
									Build your next Ideas
								</h1>
								<div className="flex w-ful">
									<p className="text-lg md:text-xl text-slate-500 dark:text-slate-300">
										Remind You is a free and open-source
										application that allows you to create
										and manage your own to-do lists.
									</p>
								</div>
							</div>
							<div className="flex w-fit gap-4">
								<Button
									asChild
								>
									<Link href={"/auth"}>
										Get Started
									</Link>
								</Button>
							</div>
						</div>
						<div className="flex w-full">
							<div className="flex w-full aspect-video relative">
								<Image
									src={"/assets/banner-img/hero-banner.avif"}
									alt="Hero banner"
									fill
									className="object-contain rounded-lg"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
