import { useState, useCallback, useEffect } from "react";

export default function useMediaQuery(width) {
	const [targetReached, setTargetReached] = useState();

	const updateTarget = useCallback(() => {
		const media = window.matchMedia(`(max-width: ${width}px)`);
		if (media.matches) {
			setTargetReached(false);
		} else {
			setTargetReached(true);
		}
	}, []);

	useEffect(() => {
		if (targetReached === undefined) {
			updateTarget();
		}
		window.addEventListener("resize", updateTarget);
		return () => window.removeEventListener("resize", updateTarget);
	}, []);

	return targetReached;
}
