import React, { useEffect, useState } from "react";

export default function Submit({ footerHeight }) {
	const [facebook, setFacebook] = useState("");
	const [image, setImage] = useState("");
	const [imageError, setImageError] = useState(false);
	const [instagram, setInstagram] = useState("");
	const [password, setPassword] = useState("");
	const [showSuccess, setShowSuccess] = useState(false);
	const [success, setSuccess] = useState(false);
	const [twitter, setTwitter] = useState("");
	const [username, setUsername] = useState("");
	const [usernameError, setUsernameError] = useState(false);
	const [website, setWebsite] = useState("");

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleImage = (e) => {
		setImage(e.target.value);
	};

	const handleFacebook = (e) => {
		setFacebook(e.target.value);
	};

	const handleInstagram = (e) => {
		setInstagram(e.target.value);
	};

	const handleTwitter = (e) => {
		setTwitter(e.target.value);
	};

	const handleWebsite = (e) => {
		setWebsite(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setShowSuccess(false);
		setTimeout(() => {
			setSuccess(false);
		}, 175);

		if (password) {
			console.log(
				"01011001 01101111 01110101 00100000 01100001 01110010 01100101 00100000 01100001 00100000 01110010 01101111 01100010 01101111 01110100 00100001"
			);
			return;
		}

		if (!username) {
			setUsernameError(true);
		} else if (username && usernameError) {
			setUsernameError(false);
		}

		if (!image) {
			setImageError(true);
		} else if (image && imageError) {
			setImageError(false);
		}

		if (!username || !image) {
			return;
		}

		//to do: add validation for image url

		const response = await fetch("/api/sendSubmission", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				image,
				facebook,
				instagram,
				twitter,
				website,
			}),
		});

		const data = await response.json();

		if (data.completed) {
			setSuccess(true);
			setTimeout(() => {
				setShowSuccess(true);
			}, 150);
		}
	};

	useEffect(() => {
		if (success) {
			setUsername("");
			setImage("");
			setFacebook("");
			setInstagram("");
			setTwitter("");
			setWebsite("");
		}
	}, [success]);

	return (
		<div
			className="container set-minHeight mx-auto px-4 mt-28 mb-8"
			style={{ minHeight: `calc(100vh - 9rem - ${footerHeight}px` }}
		>
			<div className="mb-4 md:text-lg lg:text-xl md:w-2/3 mx-auto">
				<h1 className="text-center text-xl md:text-2xl lg:text-3xl md:mb-2">
					SUBMIT
				</h1>
				<p>
					Interested in submitting to F.Art? Fill out the form below.
					Our standards are high so if your submission is accepted, we
					will contact you before posting it on the site.
				</p>
			</div>
			<div className="mb-4 md:text-lg lg:text-xl md:w-2/3 mx-auto">
				<form className="flex flex-col items-center">
					<div className="mb-2">
						<div
							className={`text-base ${
								usernameError ? "text-red-500" : ""
							}`}
						>
							Name*
						</div>{" "}
						<input
							type="text"
							className="leading-4 rounded-md w-80"
							placeholder="Name you want to be displayed"
							onChange={handleUsername}
							value={username}
						/>
					</div>
					<div className="mb-2 hidden">
						<div className="text-base">Password</div>{" "}
						<input
							type="text"
							className="leading-4 rounded-md w-80"
							onChange={handlePassword}
							value={password}
						/>
					</div>
					<div className="mb-2">
						<div
							className={`text-base ${
								imageError ? "text-red-500" : ""
							}`}
						>
							Image Link*
						</div>{" "}
						<input
							type="text"
							className="leading-4 rounded-md w-80"
							placeholder="Preferably Imgur or Google Drive"
							onChange={handleImage}
							value={image}
						/>
					</div>
					<div className="mb-2">
						<div className="text-base">Facebook</div>{" "}
						<input
							type="text"
							className="leading-4 rounded-md w-80"
							placeholder="Link to your FB fanpage"
							onChange={handleFacebook}
							value={facebook}
						/>
					</div>
					<div className="mb-2">
						<div className="text-base">Instagram</div>{" "}
						<input
							type="text"
							className="leading-4 rounded-md w-80"
							placeholder="Instagram username"
							onChange={handleInstagram}
							value={instagram}
						/>
					</div>
					<div className="mb-2">
						<div className="text-base">Twitter</div>{" "}
						<input
							type="text"
							className="leading-4 rounded-md w-80"
							placeholder="Twitter username"
							onChange={handleTwitter}
							value={twitter}
						/>
					</div>
					<div className="mb-2">
						<div className="text-base">Website</div>{" "}
						<input
							type="text"
							className="leading-4 rounded-md w-80"
							placeholder="Website URL"
							onChange={handleWebsite}
							value={website}
						/>
					</div>
					<div>
						<input
							type="submit"
							className="bg-emerald-300 border-2 rounded-md px-4 py-2 cursor-pointer"
							onClick={handleSubmit}
						/>
					</div>
				</form>
				{success && (
					<div
						className={`${
							success && showSuccess ? "opacity-100" : "opacity-0"
						} transition-all text-center`}
					>
						<p>Your submission has been received</p>
					</div>
				)}
			</div>
		</div>
	);
}
