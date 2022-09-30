import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";

import Nav from "./nav";
import useMediaQuery from "../utils/useMediaQuery";

export default function Header() {
	const navMenuRef = useRef();

	const openNavMenu = () => {
		navMenuRef.current.openModal();
	};

	//fix for when resizing and nav menu is open
	useEffect(() => {
		if (document.body.style.overflow === "hidden") {
			document.body.style.overflow = "auto";
		}
	});

	return (
		<header className="fixed top-0 flex justify-center w-full bg-emerald-300 shadow-md z-10">
			<div className="container flex justify-between items-center px-4 py-2">
				<Head>
					<title>F.Art | Artifically Rendered Tableau</title>
					<meta name="F.Art" content="Stable Diffusion art" />
				</Head>
				<div>
					<Link href="/">
						<h1 className="text-3xl logo cursor-pointer">F.ART</h1>
					</Link>
					<p className="mb-0">
						The latest art and photos coming out of Los Santos
					</p>
				</div>
				{useMediaQuery(1024) ? (
					<div>
						<nav className="text-lg flex">
							<div className="mx-2">
								<Link href="/submit">Submit</Link>
							</div>
							<div className="mx-2">
								<Link href="/about">About</Link>
							</div>
						</nav>
					</div>
				) : (
					<>
						<div className="cursor-pointer" onClick={openNavMenu}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						</div>
						<Nav ref={navMenuRef} />
					</>
				)}
			</div>
		</header>
	);
}
