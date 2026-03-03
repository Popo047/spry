"use client";

import { TaskCard } from "@/components/TaskCard";
import { mockTasks } from "@/mock/tasks";
import { Task } from "@/store";
import React, { useState } from "react";

function CompletedTasks() {
	const [allTasks, setAllTasks] = useState<Task[]>(mockTasks);

	const onDelete = (id: string) => {
		setAllTasks((prev) => prev.filter((task) => task.id !== id));
	};

	const completedTasks = allTasks.filter((task) => task.status === "completed");

	return (
		<div className="space-y-4">
			{completedTasks.length === 0 && (
				<p className="text-sm text-muted-foreground">No completed tasks yet.</p>
			)}

			{completedTasks.map((task) => (
				<TaskCard key={task.id} task={task} onDelete={onDelete} />
			))}
		</div>
	);
}

export default CompletedTasks;
