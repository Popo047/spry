"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppHeader() {
	const pathname = usePathname();

	return (
		<header className="border-b bg-background">
			<div className="max-w-full mx-auto flex items-center justify-between px-6 h-14">
				<Link
					href="/"
					className="font-semibold text-lg hover:opacity-80 transition"
				>
					Task Management Dashboard
				</Link>

				{pathname !== "/" && (
					<span className="text-sm text-muted-foreground">
						SPRY 360 Assignment
					</span>
				)}
			</div>
		</header>
	);
}
