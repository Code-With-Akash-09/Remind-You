import LearnFeed from "@/molecules/LearnFeed"
import { Button } from "@/ui/button"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"

const Home = () => {
	return (
		<>
			<div className="flex size-full p-4 md:p-6 overflow-x-auto">
				<div className="flex flex-col h-fit lg:h-full w-full gap-6">
					<div className="flex flex-col w-full h-[600px] md:h-auto md:flex-1 lg:max-h-[500px] max-w-7xl mx-auto items-center md:items-start justify-center p-4 py-2 border border-neutral-200 dark:border-neutral-800 rounded-3xl bg-gradient-to-r from-amber-400/20 to-blue-500/20 dark:from-blue-600/10 dark:to-amber-600/10">
						<div className="grid grid-cols-1 flex-1 md:grid-cols-2 gap-4">
							<div className="flex flex-col gap-6 md:gap-8 w-full items-center md:items-start justify-center md:p-8 lg:p-16 xl:p-20">
								<div className="flex flex-col gap-4 w-fit mx-auto md:mx-0">
									<h1 className="flex text-4xl md:text-5xl font-bold text-blue-600 dark:text-gray-50 w-full text-center md:text-left">
										Build your next Ideas
									</h1>
									<p className="text-lg md:text-xl text-slate-500 dark:text-slate-300 text-center md:text-left">
										Remind You is a free and open-source
										application that allows you to create
										and manage your own to-do lists.
									</p>
								</div>
								<div className="flex w-fit gap-4">
									<Button
										asChild
									>
										<Link href={"/dashboard"}>
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

					<div className="flex flex-col gap-4 w-full rounded-3xl   dark:bg-gradient-to-r dark:from-blue-600/10 dark:to-amber-600/10 border border-neutral-200 dark:border-neutral-800 max-w-7xl mx-auto h-fit p-4">
						<div className="flex w-full justify-between">
							<span className="text-sm md:text-base">Learning Videos</span>
							<Link href={"/learning/"} className="flex gap-2 w-fit items-center text-blue-500">
								See more<ChevronRightIcon className="size-5" />
							</Link>
						</div>
						<LearnFeed />
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
