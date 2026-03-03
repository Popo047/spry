"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import { Task, useTaskStore } from "@/store";
import { SummaryCard } from "@/components/SummaryCard";

function TasksLayout({
	allTasks,
	completedTasks,
}: {
	allTasks: React.ReactNode;
	completedTasks: React.ReactNode;
}) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const { addTask, tasks } = useTaskStore();

	const tab = searchParams.get("tab") ?? "all";

	const handleChange = (value: string) => {
		router.push(`/tasks?tab=${value}`);
	};

	const total = tasks.length;
	const pending = tasks.filter((t) => t.status === "pending").length;
	const inProgress = tasks.filter((t) => t.status === "in_progress").length;
	const completed = tasks.filter((t) => t.status === "completed").length;

	return (
		<div className="min-h-screen  p-8">
			<div className="max-w-5xl mx-auto space-y-6">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<SummaryCard label="Total" value={total} />
					<SummaryCard label="Pending" value={pending} />
					<SummaryCard label="In Progress" value={inProgress} />
					<SummaryCard label="Completed" value={completed} />
				</div>
				<div className="flex justify-between">
					<h1 className="text-3xl font-bold">Task Manager</h1>
					<TaskForm
						onSubmit={(data) => {
							const { title, dueDate, description } = data;
							addTask(title, dueDate, description);
						}}
					>
						<Button>+ Add Task</Button>
					</TaskForm>
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
