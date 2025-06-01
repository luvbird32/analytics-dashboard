
/**
 * Comprehensive type definitions for ECharts components
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
  dataIndex?: number;
  seriesIndex?: number;
  name?: string;
  value?: any;
}

export interface EChartsOption {
  title?: {
    text?: string;
    left?: string;
    textStyle?: {
      fontSize?: number;
    };
  };
  tooltip?: {
    trigger?: string;
    formatter?: string | ((params: any) => string);
  };
  geo?: {
    map?: string;
    roam?: boolean;
    zoom?: number;
    center?: [number, number];
    itemStyle?: {
      areaColor?: string;
      borderColor?: string;
    };
    emphasis?: {
      itemStyle?: {
        areaColor?: string;
      };
    };
  };
  visualMap?: {
    show?: boolean;
    dimension?: number;
    min?: number;
    max?: number;
    inRange?: {
      color?: string[];
    };
  };
  xAxis3D?: {
    type?: string;
    name?: string;
  };
  yAxis3D?: {
    type?: string;
    name?: string;
  };
  zAxis3D?: {
    type?: string;
    name?: string;
  };
  grid3D?: {
    boxWidth?: number;
    boxDepth?: number;
    boxHeight?: number;
    viewControl?: {
      projection?: string;
      autoRotate?: boolean;
      autoRotateDirection?: string;
      autoRotateSpeed?: number;
    };
    light?: {
      main?: {
        intensity?: number;
        shadow?: boolean;
      };
      ambient?: {
        intensity?: number;
      };
    };
  };
  series?: Array<{
    type: string;
    coordinateSystem?: string;
    data?: any[];
    symbolSize?: number | ((val: any) => number);
    itemStyle?: {
      color?: string;
      shadowBlur?: number;
      shadowColor?: string;
      opacity?: number;
    };
    emphasis?: {
      itemStyle?: {
        color?: string;
      };
    };
    shading?: string;
  }>;
}
