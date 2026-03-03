"use client";

import { useState } from "react";
import { useTaskStore } from "@/store";

import TaskControls, {
	StatusFilter,
	SortOrder,
} from "@/components/TaskControls";

import TaskList from "@/components/TaskLists";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SummaryCard } from "@/components/SummaryCard";
import TaskForm from "@/components/TaskForm";
import { Button } from "@/components/ui/button";

export default function TasksLayout() {
	const { tasks, addTask, deleteTask, updateStatus } = useTaskStore();

	const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

	const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

	const filteredTasks = tasks
		.filter((task) => {
			if (statusFilter === "all") return true;
			return task.status === statusFilter;
		})
		.sort((a, b) => {
			if (!a.dueDate || !b.dueDate) return 0;

			const dateA = new Date(a.dueDate).getTime();
			const dateB = new Date(b.dueDate).getTime();

			return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
		});

	const total = tasks.length;
	const pending = tasks.filter((t) => t.status === "pending").length;
	const inProgress = tasks.filter((t) => t.status === "in_progress").length;
	const completed = tasks.filter((t) => t.status === "completed").length;

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-5xl mx-auto space-y-6">
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

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<SummaryCard label="Total" value={total} />
					<SummaryCard label="Pending" value={pending} />
					<SummaryCard label="In Progress" value={inProgress} />
					<SummaryCard label="Completed" value={completed} />
				</div>

				<TaskControls
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					sortOrder={sortOrder}
					setSortOrder={setSortOrder}
				/>

				<Tabs defaultValue="all">
					<TabsList>
						<TabsTrigger value="all">All Tasks</TabsTrigger>
						<TabsTrigger value="completed">Completed</TabsTrigger>
					</TabsList>

					<TabsContent value="all">
						<TaskList tasks={filteredTasks} onDelete={deleteTask} />
					</TabsContent>

					<TabsContent value="completed">
						<TaskList
							tasks={filteredTasks.filter((t) => t.status === "completed")}
							onDelete={deleteTask}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
