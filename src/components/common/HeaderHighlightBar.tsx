import { Mail, PhoneCall, CurrencyRupee, User, Heart, ShoppingCart } from "tabler-icons-react";

const HeaderHighlightBar = () => {
	return (
		<main className="flex flex-col bg-violet">
			<section
				role="header_highlight"
				className="container flex flex-row justify-between w-full mx-auto text-white h-11 opacity-90"
			>
				{/* Left Content in Menu */}
				<div className="flex flex-row items-center space-x-8">
					<div className="flex flex-row items-center space-x-2">
						<Mail size={15} />
						<p>sample@example.com</p>
					</div>
					<div className="flex flex-row items-center space-x-2">
						<PhoneCall size={15} />
						<p>+91 8822447762</p>
					</div>
				</div>
				{/* Right Content in Menu */}
				<div className="flex flex-row items-center space-x-8">
					<div className="flex flex-row items-center space-x-2">
						<CurrencyRupee size={15} />
						<p>INR</p>
					</div>
					<div className="flex flex-row items-center space-x-2">
						<p>Login</p>
						<User size={15} />
					</div>
					<div className="flex flex-row items-center space-x-2">
						<p>WishList</p>
						<Heart size={15} />
					</div>
					<div className="flex flex-row items-center">
						<ShoppingCart size={15} />
					</div>
				</div>
			</section>
		</main>
	);
};

export default HeaderHighlightBar;