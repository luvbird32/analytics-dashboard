
/**
 * Type definitions for ECharts components
 */

export interface GeographicData {
  name: string;
  value: number;
  coordinates: [number, number];
}

export interface BrushData {
  date: string;
  value: number;
  category: string;
}

export interface Surface3DData {
  x: number;
  y: number;
  z: number;
}

export interface EChartsEvent {
  type: string;
  batch?: Array<{
    selected: Array<{
      dataIndex: number[];
    }>;
  }>;
}
