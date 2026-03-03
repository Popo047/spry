"use client";
import { TaskCard } from "@/components/TaskCard";
import { mockTasks } from "@/mock/tasks";
import { Task, useTaskStore } from "@/store";
import React, { useState } from "react";

function AllTasks() {
	const [allTasks, setAllTasks] = useState<Task[]>(mockTasks);
	const addTask = useTaskStore((state) => state.addTask);

	const onDelete = (id: string) => {
		setAllTasks((prev) => prev.filter((task) => task.id !== id));
	};

	return (
		<div className="space-y-4">
			{allTasks.map((task) => (
				<TaskCard key={task.id} task={task} onDelete={onDelete} />
			))}
		</div>
	);
}

export default AllTasks;
