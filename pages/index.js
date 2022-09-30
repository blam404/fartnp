import React from "react";
import dynamic from "next/dynamic";
import { gql } from "@apollo/client";
import client from "../apolloClient";

import CoverPhoto from "../components/home/coverPhoto";
const Posts = dynamic(() => import("../components/home/posts"), { ssr: false });

export default function Home({ cover, pinned, regular }) {
	const limitedPinned = pinned.slice(0, 4);
	return (
		<div className="container set-minHeight mx-auto px-4 mt-28 mb-8">
			<CoverPhoto post={cover[0]} />
			{limitedPinned.length > 0 && (
				<>
					<div className="flex justify-center w-full">
						<hr />
					</div>
					<div className="mb-8">
						<Posts posts={limitedPinned} />
					</div>
				</>
			)}
			<div className="flex justify-center w-full">
				<hr />
			</div>
			<div className="mb-8">
				<Posts posts={regular} />
			</div>
			{/* Header, logo, menu */}
		</div>
	);
}

export async function getStaticProps() {
	const { data } = await client.query({
		query: gql`
			query Posts {
				cover: posts(
					orderBy: createdAt_DESC
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
