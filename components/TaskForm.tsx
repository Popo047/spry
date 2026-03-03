"use client";

import { useState } from "react";
import { Task } from "@/store";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
interface TaskFormProps {
	children: React.ReactElement;
	task?: Task;
	onSubmit: (data: {
		title: string;
		description: string;
		dueDate: string;
		status: Task["status"];
		id?: string;
	}) => void;
}

export default function TaskForm({ children, task, onSubmit }: TaskFormProps) {
	const isEditing = !!task;

	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState<Date | undefined>();
	const [error, setError] = useState("");
	const [status, setStatus] = useState<Task["status"]>("pending");
	const resetForm = () => {
		setTitle("");
		setDescription("");
		setDueDate(undefined);
		setStatus("pending");
		setError("");
	};

	const handleSubmit = () => {
		if (!title.trim()) {
			setError("Title is required");
			return;
		}

		if (!dueDate) {
			setError("Due date is required");
			return;
		}

		onSubmit({
			title,
			description,
			dueDate: dueDate.toISOString(),
			status,
			id: isEditing ? task.id : undefined,
		});

		resetForm();
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(val) => {
				setOpen(val);

				if (val) {
					if (task) {
						setTitle(task.title);
						setDescription(task.description || "");
						setDueDate(task.dueDate ? new Date(task.dueDate) : undefined);
						setStatus(task.status);
					} else {
						resetForm();
					}
				} else {
					resetForm();
				}
			}}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent>
				<DialogDescription></DialogDescription>
				<DialogHeader>
					<DialogTitle>
						{isEditing ? "Edit Task" : "Create New Task"}
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					<Input
						placeholder="Task title..."
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
							setError("");
						}}
					/>

					<Textarea
						placeholder="Task description..."
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Select
						value={status}
						onValueChange={(val) => setStatus(val as Task["status"])}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="pending">Pending</SelectItem>
							<SelectItem value="in_progress">In Progress</SelectItem>
							<SelectItem value="completed">Completed</SelectItem>
						</SelectContent>
					</Select>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline" className="w-full">
								{dueDate ? dueDate.toDateString() : "Pick due date"}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={dueDate}
								onSelect={(date) => {
									setDueDate(date);
									setError("");
								}}
							/>
						</PopoverContent>
					</Popover>

					{error && <p className="text-sm text-destructive">{error}</p>}

					<Button onClick={handleSubmit} className="w-full">
						{isEditing ? "Update Task" : "Create Task"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
