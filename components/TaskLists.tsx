"use client";

import { Task } from "@/store";
import { TaskCard } from "@/components/TaskCard";

interface TaskListProps {
	tasks: Task[];
	onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onDelete }: TaskListProps) {
	if (!tasks.length) {
		return <p className="text-sm text-muted-foreground">No tasks found.</p>;
	}

	return (
		<div className="space-y-4">
			{tasks.map((task) => (
				<TaskCard key={task.id} task={task} onDelete={onDelete} />
			))}
		</div>
	);
}
