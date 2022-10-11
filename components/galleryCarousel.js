import React, { useState } from "react";
import Image from "next/future/image";

import useMediaQuery from "../utils/useMediaQuery";

export default function GalleryCarousel({ photos }) {
	const [photoIndex, setPhotoIndex] = useState(0);

	const handleNext = () => {
		if (photoIndex < photos.length - 1) {
			setPhotoIndex(photoIndex + 1);
		}
	};

	const handlePrev = () => {
		if (photoIndex > 0) {
			setPhotoIndex(photoIndex - 1);
		}
	};
	return (
		<div className="bg-gray-800 w-full mb-8 relative">
			<div className="flex test justify-center ">
				<Image
					src={photos[photoIndex].url}
					alt="pohoto alt tag"
					width={photos[photoIndex].width}
					height={photos[photoIndex].height}
				/>
			</div>
			{photos.length > 0 && (
				<>
					<div className="flex justify-center pt-2">
						{photos.map((photo, index) => (
							<div
								className={`w-20 h-28 relative mx-1 cursor-pointer ${
									photoIndex === index &&
									"border-2 border-emerald-300"
								}`}
							>
								<Image
									src={photo.url}
									fill
									onClick={() => setPhotoIndex(index)}
									className="object-cover"
								/>
							</div>
						))}
					</div>
					{useMediaQuery(640) && (
						<>
							<div
								className={`absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer ${
									photoIndex <= 0 &&
									"pointer-events-none opacity-25"
								}`}
								onClick={handlePrev}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-12 h-12 text-emerald-300"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 19.5L8.25 12l7.5-7.5"
									/>
								</svg>
							</div>
							<div
								className={`absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer ${
									photoIndex === photos.length - 1 &&
									"pointer-events-none opacity-25"
								}`}
								onClick={handleNext}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-12 h-12 text-emerald-300"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M8.25 4.5l7.5 7.5-7.5 7.5"
									/>
								</svg>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}
