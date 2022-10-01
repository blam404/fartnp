import client from "../../apolloClient";
import { gql } from "@apollo/client";

export default async function handler(req, res) {
	try {
		const { page, pageSize } = req.body;

		const { data } = await client.query({
			query: gql`
				query Posts($limit: Int, $skip: Int) {
					posts(orderBy: createdAt_DESC, first: $limit, skip: $skip) {
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
			variables: {
				limit: pageSize,
				skip: page * pageSize,
			},
		});

		res.status(201);
		res.json(data);
	} catch (e) {
		res.status(500);
		res.json({
			createSubmission: {
				acknowledged: false,
				error: e,
			},
		});
	}
}
