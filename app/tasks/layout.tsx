"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";

function TasksLayout({
	allTasks,
	completedTasks,
}: {
	allTasks: React.ReactNode;
	completedTasks: React.ReactNode;
}) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const tab = searchParams.get("tab") ?? "all";

	const handleChange = (value: string) => {
		router.push(`/tasks?tab=${value}`);
	};

	return (
		<div className="min-h-screen  p-8">
			<div className="max-w-5xl mx-auto space-y-6">
				<div className="flex justify-between">
					<h1 className="text-3xl font-bold">Task Manager</h1>
					<TaskForm />
				</div>

				<Tabs value={tab} onValueChange={handleChange}>
					<TabsList className="min-w-full">
						<TabsTrigger value="all">All Tasks</TabsTrigger>
						<TabsTrigger value="completedTasks">Completed Tasks</TabsTrigger>
					</TabsList>

					<TabsContent value="all">{allTasks}</TabsContent>
					<TabsContent value="completedTasks">{completedTasks}</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

export default TasksLayout;
