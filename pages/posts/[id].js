import React, { useEffect, useState } from "react";
import client from "../../apolloClient";
import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { loremIpsum } from "react-lorem-ipsum";

export async function getStaticPaths() {
	const { data } = await client.query({
		query: gql`
			query {
				posts {
					id
				}
			}
		`,
	});
	const { posts } = data;
	const paths = posts.map((post) => ({ params: { id: post.id } }));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { data } = await client.query({
		query: gql`
			query getPosts($id: ID) {
				post(where: { id: $id }) {
					publishedAt
					title
					tags
					photos {
						url
						height
						width
					}
					body {
						text
					}
					authors {
						id
						username
						facebook
						twitter
						website
						instagram
					}
				}
			}
		`,
		variables: { id: context.params.id },
	});

	return {
		props: {
			post: data.post,
		},
	};
}

export default function Post({ post, footerHeight }) {
	const [lorem, setLorem] = useState([]);
	useEffect(() => {
		if (lorem.length === 0) {
			setLorem(
				loremIpsum({
					p: randomNum,
					random: true,
					startWithLoremIpsum: false,
				})
			);
		}
	}, []);

	const randomNum = Math.floor(Math.random() * (5 - 2) + 2);
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

	const publishedParsed = new Date(post.publishedAt);
	const publishedMonth = monthArray[publishedParsed.getMonth()];
	const publishedDate = publishedParsed.getDate();
	const publishedYear = publishedParsed.getFullYear();

	return (
		<div
			className="set-minHeight container mx-auto px-4 mt-28 mb-8"
			style={{ minHeight: `calc(100vh - 9rem - ${footerHeight}px` }}
		>
			<div>
				<div className="text-center mb-4">
					<h1 className=" text-xl md:text-2xl lg:text-3xl">
						{post.title}
					</h1>
					<p className="text-slate-500 text-lg md:text-xl lg:text-2xl">
						{publishedMonth} {publishedDate}, {publishedYear}
					</p>
				</div>
				<div className="flex justify-center mb-8 bg-gray-800 w-full">
					<Image
						src={post.photos[0].url}
						alt={post.title}
						layout="intrinsic"
						width={post.photos[0].width}
						height={post.photos[0].height}
					/>
				</div>
				<div className="mb-8 md:w-2/3 mx-auto">
					{post.body ? (
						<div className="md:text-lg lg:text-xl">
							<p>{post.body.text}</p>
						</div>
					) : (
						<div className="md:text-lg lg:text-xl">
							{lorem.map((text) => (
								<p key={text}>{text}</p>
							))}
						</div>
					)}
				</div>
			</div>
			<div className="mb-8 md:w-2/3 mx-auto">
				<h2 className="text-lg md:text-xl lg:text-2xl">
					<strong>Artist information:</strong>
				</h2>
				{post.authors.map((author) => (
					<div key={author.id} className="mb-2">
						<div className="flex items-center">
							<div className="mr-2 md:text-lg lg:text-xl">
								<Link href={`/artists/${author.id}`}>
									{author.username}
								</Link>
							</div>
							{author.facebook && (
								<div className="mx-1 h-8 w-8">
									<a
										href={`https://www.facebook.com/${author.facebook}`}
										target="_blank"
										rel="noreferrer"
									>
										<Image
											src="/facebook.svg"
											alt="Facebook icon"
											width="64"
											height="64"
										/>
									</a>
								</div>
							)}
							{author.instagram && (
								<div className="mx-1 h-8 w-8">
									<a
										href={`https://www.instagram.com/${author.instagram}`}
										target="_blank"
										rel="noreferrer"
									>
										<Image
											src="/instagram.svg"
											alt="Instagram icon"
											width="64"
											height="64"
										/>
									</a>
								</div>
							)}
							{author.instagram && (
								<div className="mx-1 h-8 w-8">
									<a
										href={`https://twitter.com/${author.twitter}`}
										target="_blank"
										rel="noreferrer"
									>
										<Image
											src="/twitter.svg"
											alt="Instagram icon"
											width="64"
											height="64"
										/>
									</a>
								</div>
							)}
						</div>
						{author.website && (
							<p className="md:text-lg lg:text-xl">
								<a
									href={author.website}
									target="_blank"
									rel="noreferrer"
								>
									{author.website}
								</a>
							</p>
						)}
					</div>
				))}
			</div>
			<div></div>
		</div>
	);
}
