import Link from "next/link";

export default function HomePage() {
	return (
		<main className="min-h-screen flex items-center justify-center from-slate-900 to-slate-800  px-6">
			<div className="max-w-7xl text-center space-y-6">
				<h1 className="text-4xl md:text-5xl w-full font-bold">
					SPRY 360 Assignment : Task Management Dashboard
				</h1>

				<p className="text-lg ">
					This project demonstrates a task management system built using
					Next.js, TypeScript, Zustand, and localForage.
				</p>

				<Link
					href="/tasks"
					className="inline-block text-white bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-lg font-medium shadow-lg"
				>
					View Task Manager →
				</Link>
			</div>
		</main>
	);
}
