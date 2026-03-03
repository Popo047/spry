"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Task, TaskStatus, useTaskStore } from "@/store";
import TaskForm from "./TaskForm";

interface TaskCardProps {
	task: Task;
	onDelete: (id: string) => void;
}

const statusVariant: Record<TaskStatus, "default" | "secondary" | "outline"> = {
	pending: "outline",
	in_progress: "secondary",
	completed: "default",
};

const statusRender: Record<TaskStatus, string> = {
	completed: "Completed",
	in_progress: "In Progress",
	pending: "Pending",
};

export function TaskCard({ task, onDelete }: TaskCardProps) {
	const { updateTask } = useTaskStore();

	return (
		<Card>
			<CardHeader className="flex flex-row items-start justify-between gap-2">
				<div className="flex flex-col gap-1">
					<CardTitle className="text-base leading-snug">{task.title}</CardTitle>
					<Badge variant={statusVariant[task.status]} className="w-fit">
						{statusRender[task.status]}
					</Badge>
				</div>
				<div className="flex gap-1">
					<TaskForm
						task={task}
						onSubmit={(updatedData) => {
							const { description, dueDate, status, title, id } = updatedData;
							updateTask(id!, title, dueDate, status, description);
						}}
					>
						<Button variant="ghost" size="icon">
							<Pencil className="size-4" />
						</Button>
					</TaskForm>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => onDelete(task.id)}
						aria-label={`Delete ${task.title}`}
					>
						<Trash2 className="size-4 text-destructive" />
					</Button>
				</div>
			</CardHeader>
			{(task.description || task.dueDate) && (
				<CardContent className="flex flex-col gap-2">
					{task.description && (
						<p className="text-sm text-muted-foreground">{task.description}</p>
					)}
					{task.dueDate && (
						<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
							<Calendar className="size-3.5" />
							<span>{format(parseISO(task.dueDate), "MMM d, yyyy")}</span>
						</div>
					)}
				</CardContent>
			)}
		</Card>
	);
}
