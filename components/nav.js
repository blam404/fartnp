import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

const Nav = forwardRef((props, ref) => {
	const [showModal, setShowModal] = useState(false);
	const [translate, setTranslate] = useState("translateY(0)");

	const modalRef = useRef();

	useImperativeHandle(
		ref,
		() => {
			return {
				openModal: () => openModal(),
				closeModal: () => closeModal(),
			};
		},
		[]
	);

	useEffect(() => {
		if (showModal) {
			setTranslate("translateX(-100%)");
		}
	}, [showModal]);

	useEffect(() => {
		if (showModal) {
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, [showModal]);

	const openModal = () => {
		setShowModal(true);
		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setTranslate("translateX(0)");
		setTimeout(() => {
			setShowModal(false);
		}, 300);
		document.body.style.overflow = "auto";
	};

	const handleClickOutside = (event) => {
		if (
			modalRef.current &&
			!modalRef.current.parentNode.contains(event.target)
		) {
			closeModal();
		}
	};

	if (showModal) {
		return createPortal(
			<>
				<div
					ref={modalRef}
					className="fixed h-full w-full sm:w-1/2 md:w-2/5 sm:shadow-2xl left-full bottom-0 top-0 right-0 bg-emerald-100 z-20 overflow-y-auto transition-all duration-250"
					style={{
						transform: translate,
					}}
				>
					<div
						className="absolute top-4 right-4 cursor-pointer"
						onClick={closeModal}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</div>
					<nav className="text-3xl flex flex-col h-full justify-center text-center">
						<div className="mb-2" onClick={closeModal}>
							<Link href="/">Home</Link>
						</div>
						<div className="mb-2" onClick={closeModal}>
							<Link href="/articles">Articles</Link>
						</div>
						<div className="mb-2" onClick={closeModal}>
							<Link href="/submit">Submit</Link>
						</div>
						<div className="mb-2" onClick={closeModal}>
							<Link href="/about">About</Link>
						</div>
					</nav>
				</div>
			</>,
			document.getElementById("portal-root")
		);
	} else {
		return null;
	}
});

export default Nav;
