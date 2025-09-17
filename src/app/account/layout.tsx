import Image from "next/image";

export default function AccountLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-wrap min-h-screen">
			{/* Left: Image */}
			<div className="w-full md:w-[55%]">
				<Image
					src="/images/login-bg.png"
					alt="Customer Dashboard"
					width={1054}
					height={1080}
					className="object-cover w-full h-full"
				/>
			</div>
			{/* Right: Login Form */}
			<div className="w-full md:w-[45%] flex flex-col justify-center items-center bg-[#204971] p-4 py-8 md:p-8">
				<div className="max-w-[510px] w-full lg:space-y-8 space-y-4">
					{/* Logo & Title */}
					<div className="flex flex-col items-center mb-6">
						<Image
							src="/images/logo.svg"
							alt="Churchfield Logo"
							height={108}
							width={590}
							className="h-11 lg:h-28"
						/>
					</div>

					{/* Children Component */}
					{children}

					<div className="mt-4 lg:mt-6 text-center">
						<span className="text-white text-base flex items-center justify-center gap-1">
							Customer Support{" "}
							<span className="inline-block">
								<svg
									width="16"
									viewBox="0 0 25 25"
									fillOpacity="0.5"
									fill="#fff"
								>
									<use href="/images/sprite.svg#svg-question-circle"></use>
								</svg>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
