import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CoverPhoto({ post }) {
	return (
		<>
			<div className="flex justify-center">
				<div className="flex flex-wrap lg:w-2/3">
					<div className="flex justify-center w-full lg:w-1/2 mb-2 lg:mb-0">
						<Link href={`/posts/${post.id}`}>
							<a>
								<Image
									src={post.photos[0].url}
									alt={post.title}
									width={post.photos[0].width}
									height={post.photos[0].height}
									className="cursor-pointer"
								/>
							</a>
						</Link>
					</div>
					<div className="w-full lg:w-1/2 lg:pl-12">
						<h2 className="text-xl md:text-2xl lg:text-3xl text-slate-800 cursor-pointer mb-2">
							<Link href={`/posts/${post.id}`}>
								<strong>{post.title}</strong>
							</Link>
						</h2>
						<p className="md:text-xl lg:text-2xl">
							{post.body.text}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
