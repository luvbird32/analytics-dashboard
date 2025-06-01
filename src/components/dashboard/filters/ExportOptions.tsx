
import { Button } from '@/components/ui/button';

interface ExportOptionsProps {
  onExport: (format: 'pdf' | 'excel' | 'csv' | 'png') => void;
}

/**
 * Export options component for dashboard data
 */
export const ExportOptions = ({ onExport }: ExportOptionsProps) => {
  const exportFormats = [
    { format: 'pdf', label: 'PDF Report' },
    { format: 'excel', label: 'Excel' },
    { format: 'csv', label: 'CSV' },
    { format: 'png', label: 'PNG Charts' }
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Export Data</label>
      <div className="flex flex-wrap gap-2">
        {exportFormats.map(({ format, label }) => (
          <Button
            key={format}
            variant="outline"
            size="sm"
            onClick={() => onExport(format as any)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};
