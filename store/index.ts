import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import localforage from "localforage";

export type TaskStatus = "pending" | "in_progress" | "completed";

export interface Task {
	id: string;
	title: string;
	description?: string;
	status: TaskStatus;
	createdAt: number;
	dueDate: string;
}

interface TaskStore {
	tasks: Task[];

	addTask: (title: string, dueDate: string, description?: string) => void;
	updateStatus: (id: string, status: TaskStatus) => void;
	deleteTask: (id: string) => void;

	pending: () => Task[];
	inProgress: () => Task[];
	completed: () => Task[];
}

export const useTaskStore = create<TaskStore>()(
	persist(
		(set, get) => ({
			tasks: [],

			addTask: (title, dueDate, description) =>
				set((state) => ({
					tasks: [
						...state.tasks,
						{
							id: crypto.randomUUID(),
							title,
							status: "pending",
							createdAt: Date.now(),
							dueDate,
							description: description ? description : "",
						},
					],
				})),

			updateStatus: (id, status) =>
				set((state) => ({
					tasks: state.tasks.map((task) =>
						task.id === id ? { ...task, status } : task,
					),
				})),

			deleteTask: (id) =>
				set((state) => ({
					tasks: state.tasks.filter((task) => task.id !== id),
				})),

			pending: () => get().tasks.filter((task) => task.status === "pending"),

			inProgress: () =>
				get().tasks.filter((task) => task.status === "in_progress"),

			completed: () =>
				get().tasks.filter((task) => task.status === "completed"),
		}),
		{
			name: "task-storage",
			storage: createJSONStorage(() => localforage),
		},
	),
);
