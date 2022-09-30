import client from "../../apolloClient";
import { gql } from "@apollo/client";

export default async function handler(req, res) {
	try {
		const { username, image, facebook, instagram, twitter, website } =
			req.body;

		const variables = {
			username,
			image,
			facebook,
			instagram,
			twitter,
			website,
		};

		const { data } = await client.mutate({
			mutation: gql`
				mutation CreateSubmission(
					$username: String
					$image: String
					$facebook: String
					$instagram: String
					$twitter: String
					$website: String
				) {
					createSubmission(
						data: {
							username: $username
							image: $image
							facebook: $facebook
							instagram: $instagram
							twitter: $twitter
							website: $website
						}
					) {
						id
					}
				}
			`,
			variables,
		});

		res.status(201);
		res.json({
			data: {
				...data,
				completed: true,
			},
		});
	} catch (e) {
		console.log("e: ", e);
		res.status(500);
		res.json({
			createSubmission: {
				acknowledged: false,
				error: e,
			},
		});
	}
}
