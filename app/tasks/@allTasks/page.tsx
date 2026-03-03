"use client";
import { TaskCard } from "@/components/TaskCard";
import { useTaskStore } from "@/store";

function AllTasks() {
	const { tasks, deleteTask } = useTaskStore();

	const onDelete = (id: string) => {
		deleteTask(id);
	};

	return (
		<div className="space-y-4">
			{tasks.map((task) => (
				<TaskCard key={task.id} task={task} onDelete={onDelete} />
			))}
		</div>
	);
}

export default AllTasks;
