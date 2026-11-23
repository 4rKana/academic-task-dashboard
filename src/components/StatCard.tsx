interface StatCardProps {
  label: string;
  value: number;
  subtitle: string;
  accent?: 'default' | 'amber' | 'emerald';
}

export function StatCard({
  label,
  value,
  subtitle,
  accent = 'default',
}: StatCardProps) {
  return (
    <div className={`stat-card stat-${accent}`}>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      <span className="stat-sub">{subtitle}</span>
    </div>
  );
}