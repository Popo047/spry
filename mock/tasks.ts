import { Task } from "@/store";

export type TaskStatus = "pending" | "in_progress" | "completed";

export const mockTasks: Task[] = [
	{
		id: "1",
		title: "Design task card UI",
		status: "pending",
		createdAt: Date.now(),
		dueDate: new Date(Date.now() + 86400000).toISOString(),
	},
	{
		id: "2",
		title: "Implement Zustand store",
		status: "in_progress",
		createdAt: Date.now(),
		dueDate: new Date(Date.now() + 2 * 86400000).toISOString(),
	},
	{
		id: "3",
		title: "Write validation logic",
		status: "completed",
		createdAt: Date.now(),
		dueDate: new Date(Date.now() - 86400000).toISOString(),
	},
	{
		id: "4",
		title: "Add completed tasks tab",
		status: "pending",
		createdAt: Date.now(),
		dueDate: new Date(Date.now() + 5 * 86400000).toISOString(),
	},
];
