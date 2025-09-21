interface SummaryPanelProps {
  summary: {
    totalEmission: number;
    emissionByCategory: Record<string, number>;
  } | null;
  isLoading: boolean;
}

export default function SummaryPanel({ summary, isLoading }: SummaryPanelProps) {
  if (isLoading) {
    return <p>Loading summary...</p>;
  }

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Summary</h2>
      <p>Total Emission: {summary?.totalEmission || 0}</p>
      {summary?.emissionByCategory && (
        <div className="mt-2">
          {Object.entries(summary.emissionByCategory).map(([cat, value]) => (
            <p key={cat}>
              {cat}: {String(value)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}