"use client";

import { TaskCard } from "@/components/TaskCard";
import { Task, useTaskStore } from "@/store";

function CompletedTasks() {
	const { completed, deleteTask } = useTaskStore();

	const onDelete = (id: string) => {
		deleteTask(id);
	};

	return (
		<div className="space-y-4">
			{completed().length === 0 && (
				<p className="text-sm text-muted-foreground">No completed tasks yet.</p>
			)}

			{completed().map((task) => (
				<TaskCard key={task.id} task={task} onDelete={onDelete} />
			))}
		</div>
	);
}

export default CompletedTasks;
