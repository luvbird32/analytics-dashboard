
import { useCallback } from 'react';
import { ExportApi } from '@/api/services/exportApi';

/**
 * Hook for handling data export functionality
 */
export const useExportHandling = () => {
  const handleExport = useCallback(async (format: 'pdf' | 'excel' | 'csv' | 'png', data: any) => {
    try {
      console.log(`📄 Exporting data as ${format.toUpperCase()}...`);
      
      const exportOptions = {
        data,
        filename: `dashboard-export-${Date.now()}`,
        includeCharts: true
      };

      let result;
      switch (format) {
        case 'pdf':
          result = await ExportApi.exportPDF(exportOptions);
          break;
        case 'excel':
          result = await ExportApi.exportExcel(exportOptions);
          break;
        case 'csv':
          result = await ExportApi.exportCSV(exportOptions);
          break;
        case 'png':
          result = await ExportApi.exportPNG(exportOptions);
          break;
        default:
          throw new Error(`Unsupported export format: ${format}`);
      }

      if (result.success) {
        console.log(`✅ Data exported successfully as ${format.toUpperCase()}`);
      } else {
        console.error(`❌ Export failed: ${result.error}`);
      }

      return result;
    } catch (error) {
      console.error('❌ Export error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Export failed' };
    }
  }, []);

  return {
    handleExport
  };
};
