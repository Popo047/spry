export function SummaryCard({
	label,
	value,
}: {
	label: string;
	value: number;
}) {
	return (
		<div className="rounded-xl border bg-background p-4 shadow-sm">
			<p className="text-xs uppercase tracking-wide text-muted-foreground">
				{label}
			</p>
			<p className="text-3xl font-bold mt-1">{value}</p>
		</div>
	);
}
