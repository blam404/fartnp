import React, { useEffect, useState } from "react";
import client from "../apolloClient";
import dynamic from "next/dynamic";
import { gql } from "@apollo/client";

const Posts = dynamic(() => import("../components/home/posts"), {
	ssr: false,
});

export default function Articles({ allPosts, footerHeight }) {
	const [page, setPage] = useState(0);
	const [posts, setPosts] = useState([]);

	const pageSize = 12;
	const totalPages = Math.ceil(allPosts.length / pageSize);

	useEffect(() => {
		fetchData();
	}, [page]);

	const fetchData = async () => {
		const response = await fetch("/api/getArticles", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				page,
				pageSize,
			}),
		});

		const data = await response.json();
		setPosts(data.posts || []);
	};

	const handlePrevPage = () => {
		if (page !== 0) {
			setPage(page - 1);
		}
	};

	const handleNextPage = () => {
		if (page !== totalPages - 1) {
			setPage(page + 1);
		}
	};

	return (
		<div
			className="container mx-auto px-4 mt-28 mb-8"
			style={{ minHeight: `calc(100vh - 9rem - ${footerHeight}px` }}
		>
			<div className="mb-4 md:text-lg lg:text-xl mx-auto">
				<h1 className="text-center text-xl md:text-2xl lg:text-3xl md:mb-2">
					Articles
				</h1>
			</div>
			<div className="mb-8">
				{posts.length > 0 && <Posts posts={posts} />}
				<div className="flex justify-center items-center">
					<div
						className="flex mx-3 cursor-pointer"
						onClick={handlePrevPage}
					>
						<button disabled={page === 0}>
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
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
						</button>
					</div>
					{page - 2 >= 0 && (
						<div
							className="mx-3 text-lg cursor-pointer text-slate-400 underline"
							onClick={() => setPage(page - 2)}
						>
							{page - 1}
						</div>
					)}
					{page - 1 >= 0 && (
						<div
							className="mx-3 text-lg cursor-pointer text-slate-400 underline"
							onClick={() => setPage(page - 1)}
						>
							{page}
						</div>
					)}
					{/* active page here*/}
					<div className="mx-1 text-2xl">{page + 1}</div>
					{/* active page here*/}
					{page + 1 <= totalPages - 1 && (
						<div
							className="mx-3 text-lg cursor-pointer text-slate-400 underline"
							onClick={() => setPage(page + 1)}
						>
							{page + 2}
						</div>
					)}
					{page + 2 <= totalPages - 1 && (
						<div
							className="mx-3 text-lg cursor-pointer text-slate-400 underline"
							onClick={() => setPage(page + 2)}
						>
							{page + 3}
						</div>
					)}
					<div
						className="flex mx-3 cursor-pointer"
						onClick={handleNextPage}
					>
						<button disabled={page === totalPages - 1}>
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
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const { data } = await client.query({
		query: gql`
			query Posts {
				allPosts: posts(orderBy: createdAt_DESC) {
					id
				}
			}
		`,
	});

	return { props: data };
}
