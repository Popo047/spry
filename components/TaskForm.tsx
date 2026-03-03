"use client";

import { useState } from "react";
import { useTaskStore } from "@/store";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
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

export default function TaskForm() {
	const addTask = useTaskStore((state) => state.addTask);

	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [dueDate, setDueDate] = useState<Date | undefined>();
	const [error, setError] = useState("");

	const handleSubmit = () => {
		if (!title.trim()) {
			setError("Title is required");
			return;
		}

		if (!dueDate) {
			setError("Due date is required");
			return;
		}

		addTask(title, dueDate.toISOString());
		setTitle("");
		setDueDate(undefined);
		setError("");
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className="cursor-pointer">
				<Button>+ Add Task</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Task</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					<div>
						<Input
							placeholder="Task title..."
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
								setError("");
							}}
						/>
					</div>

					<div>
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
					</div>

					{error && <p className="text-sm text-red-500">{error}</p>}

					<Button onClick={handleSubmit} className="w-full ">
						Create Task
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
