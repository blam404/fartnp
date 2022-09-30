import React from "react";
import client from "../../apolloClient";
import dynamic from "next/dynamic";
import { gql } from "@apollo/client";
import Image from "next/image";

const Posts = dynamic(() => import("../../components/home/posts"), {
	ssr: false,
});

export async function getStaticPaths() {
	const { data } = await client.query({
		query: gql`
			query {
				authors {
					id
				}
			}
		`,
	});
	const { authors } = data;
	const paths = authors.map((post) => ({ params: { id: post.id } }));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { data } = await client.query({
		query: gql`
			query getPosts($authorId: ID) {
				posts(
					orderBy: createdAt_DESC
					where: { authors_some: { id: $authorId } }
				) {
					id
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
				}
				author(where: { id: $authorId }) {
					username
					facebook
					twitter
					website
					instagram
				}
			}
		`,
		variables: { authorId: context.params.id },
	});

	return {
		props: {
			posts: data.posts,
			author: data.author,
		},
	};
}

export default function Post({ posts, author, footerHeight }) {
	return (
		<div
			className="set-minHeight container mx-auto px-4 mt-28 mb-8"
			style={{ minHeight: `calc(100vh - 9rem - ${footerHeight}px` }}
		>
			<div>
				<div className="text-center mb-4">
					<h1 className=" text-xl md:text-2xl lg:text-3xl">
						{author.username}
					</h1>
				</div>
				<div className="flex justify-center mb-4">
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
								href={`https://twitter.com/prototypem/${author.twitter}`}
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
			</div>
			<div className="mb-8">
				<Posts posts={posts} />
			</div>
		</div>
	);
}
