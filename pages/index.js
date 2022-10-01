import React from "react";
import dynamic from "next/dynamic";
import { gql } from "@apollo/client";
import client from "../apolloClient";

import CoverPhoto from "../components/home/coverPhoto";
const Posts = dynamic(() => import("../components/home/posts"), { ssr: false });

export default function Home({ cover, pinned, regular, footerHeight }) {
	return (
		<div
			className="container mx-auto px-4 mt-28 mb-8"
			style={{ minHeight: `calc(100vh - 9rem - ${footerHeight}px` }}
		>
			<CoverPhoto post={cover[0]} />
			{pinned.length > 0 && (
				<>
					<div className="flex justify-center w-full">
						<hr />
					</div>
					<div className="mb-8">
						<h2 className="text-xl md:text-2xl lg:text-3xl text-center mb-8">
							Must Read
						</h2>
						<Posts posts={pinned} />
					</div>
				</>
			)}
			<div className="flex justify-center w-full">
				<hr />
			</div>
			<div className="mb-8">
				<h2 className="text-xl md:text-2xl lg:text-3xl text-center mb-8">
					Latest Articles
				</h2>
				<Posts posts={regular} />
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const { data } = await client.query({
		query: gql`
			query Posts {
				cover: posts(
					orderBy: createdAt_DESC
					first: 1
					where: { coverPhoto: true, pinned: false }
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
				pinned: posts(
					orderBy: createdAt_DESC
					first: 4
					where: { coverPhoto: false, pinned: true }
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
				regular: posts(
					orderBy: createdAt_DESC
					first: 6
					where: { coverPhoto: false, pinned: false }
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
			}
		`,
	});

	//revalidate set for 30 mins
	return { props: data, revalidate: 1800 };
}
