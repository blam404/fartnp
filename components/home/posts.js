import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LoremIpsum } from "react-lorem-ipsum";

export default function Posts({ posts }) {
	const monthArray = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return (
		<div className="flex flex-wrap">
			{posts.map((post) => {
				const publishedParsed = new Date(post.publishedAt);
				const publishedMonth = monthArray[publishedParsed.getMonth()];
				const publishedDate = publishedParsed.getDate();
				const publishedYear = publishedParsed.getFullYear();
				return (
					<div
						key={post.id}
						className="w-full md:w-1/2 lg:w-1/3 mb-8 md:px-1"
					>
						<div className="relative w-full h-80 md:h-96 overflow-hidden mb-2">
							<Link href={`/posts/${post.id}`}>
								<a>
									<Image
										src={post.photos[0].url}
										alt={post.title}
										layout="fill"
										objectFit="cover"
										className="cursor-pointer"
									/>
								</a>
							</Link>
						</div>
						<div>
							<h3 className="cursor-pointer text-lg md:text-xl">
								<Link href={`/posts/${post.id}`}>
									<strong>{post.title}</strong>
								</Link>
							</h3>
							<p className="text-sm md:text-base text-slate-500 mb-2">
								{publishedMonth} {publishedDate},{" "}
								{publishedYear}
							</p>
							{post.body ? (
								<p className="post-caption text-sm md:text-base">
									{post.body.text}
								</p>
							) : (
								<div className="post-caption text-sm md:text-base mb-2">
									<LoremIpsum startWithLoremIpsum={false} />
								</div>
							)}
							{/* Add link to post when that page is done */}
							<p className="text-sm">
								<Link href={`/posts/${post.id}`}>
									Keep reading
								</Link>
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}
