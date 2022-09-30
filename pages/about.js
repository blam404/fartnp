import React from "react";

export default function About({ footerHeight }) {
	return (
		<div
			className="container mx-auto px-4 mt-28 mb-8"
			style={{ minHeight: `calc(100vh - 9rem - ${footerHeight}px` }}
		>
			<div className="mb-4 md:text-lg lg:text-xl md:w-2/3 mx-auto">
				<h1 className="text-center text-xl md:text-2xl lg:text-3xl md:mb-2">
					ABOUT
				</h1>
				<p>
					This is only page where I&apos;ll talk out of character.
					F.Art is a fictional magazine in my head cannon for the
					NoPixel GTARP server. Also, I know it spells FART. In the
					NoPixel universe everything has a bad acronym and this is
					short for Fantastic Art, but to be more meta it stands for
					Fantastic Artifically Rendered Tableau. Other examples in
					the server are a church named Salvation Lies Under The Stars
					or a police unit named Class-2 Under Mandate.
				</p>
				<p>
					The idea for this website started when I was playing around
					in Stable Diffusion to generate fanart of my favorite
					characters and streamers that I follow. The first image I
					generated was April Fooze modeling for a magazine cover.
					From there, two things popped into my head:
				</p>
				<p className="md:text-lg lg:text-xl mb-0">
					- I wanted to create another website to add to my portfolio
					since I&apos;m looking for a job
				</p>
				<p>- I wanted to a website to show my work</p>
				<p>And that is how this website came into existence.</p>
			</div>
		</div>
	);
}
