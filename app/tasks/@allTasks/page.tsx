"use client";
import { TaskCard } from "@/components/TaskCard";
import { mockTasks } from "@/mock/tasks";
import { Task, useTaskStore } from "@/store";
import React, { useState } from "react";

function AllTasks() {
	const { addTask, tasks } = useTaskStore();

	const onDelete = (id: string) => {
		setAllTasks((prev) => prev.filter((task) => task.id !== id));
	};

	return (
		<div className="space-y-4">
			{alslTasks.map((task) => (
				<TaskCard key={task.id} task={task} onDelete={onDelete} />
			))}
		</div>
	);
}

export default AllTasks;
