"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export type StatusFilter = "all" | "pending" | "in_progress" | "completed";
export type SortOrder = "asc" | "desc";

interface TaskControlsProps {
	statusFilter: StatusFilter;
	setStatusFilter: (value: StatusFilter) => void;
	sortOrder: SortOrder;
	setSortOrder: (value: SortOrder) => void;
}

export default function TaskControls({
	statusFilter,
	setStatusFilter,
	sortOrder,
	setSortOrder,
}: TaskControlsProps) {
	return (
		<div className="flex max-w-6xl flex-col md:flex-row gap-4 md:items-center md:justify-between">
			<Select
				value={statusFilter}
				onValueChange={(val) => setStatusFilter(val as StatusFilter)}
			>
				<SelectTrigger className="w-50">
					<SelectValue placeholder="Filter by status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					<SelectItem value="pending">Pending</SelectItem>
					<SelectItem value="in_progress">In Progress</SelectItem>
					<SelectItem value="completed">Completed</SelectItem>
				</SelectContent>
			</Select>

			<Select
				value={sortOrder}
				onValueChange={(val) => setSortOrder(val as SortOrder)}
			>
				<SelectTrigger className="w-50">
					<SelectValue placeholder="Sort by due date" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="asc">Due Date ↑</SelectItem>
					<SelectItem value="desc">Due Date ↓</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
