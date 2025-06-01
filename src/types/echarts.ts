
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

// More specific and complete ECharts option interface
export interface EChartsOption {
  title?: {
    text?: string;
    left?: string | number;
    textStyle?: {
      fontSize?: number;
      color?: string;
    };
  };
  tooltip?: {
    trigger?: 'item' | 'axis' | 'none';
    formatter?: string | ((params: any) => string);
    show?: boolean;
  };
  legend?: {
    data?: string[];
    orient?: 'horizontal' | 'vertical';
    left?: string | number;
    top?: string | number;
  };
  xAxis?: {
    type?: 'category' | 'value' | 'time' | 'log';
    data?: any[];
    name?: string;
    boundaryGap?: boolean;
  };
  yAxis?: {
    type?: 'category' | 'value' | 'time' | 'log';
    name?: string;
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
  brush?: {
    toolbox?: string[];
    xAxisIndex?: number | number[];
    yAxisIndex?: number | number[];
  };
  visualMap?: {
    show?: boolean;
    dimension?: number;
    min?: number;
    max?: number;
    inRange?: {
      color?: string[];
    };
    type?: 'continuous' | 'piecewise';
  };
  xAxis3D?: {
    type?: 'category' | 'value' | 'time' | 'log';
    name?: string;
    min?: number;
    max?: number;
  };
  yAxis3D?: {
    type?: 'category' | 'value' | 'time' | 'log';
    name?: string;
    min?: number;
    max?: number;
  };
  zAxis3D?: {
    type?: 'category' | 'value' | 'time' | 'log';
    name?: string;
    min?: number;
    max?: number;
  };
  grid3D?: {
    boxWidth?: number;
    boxDepth?: number;
    boxHeight?: number;
    viewControl?: {
      projection?: 'perspective' | 'orthographic';
      autoRotate?: boolean;
      autoRotateDirection?: 'cw' | 'ccw';
      autoRotateSpeed?: number;
      distance?: number;
    };
    light?: {
      main?: {
        intensity?: number;
        shadow?: boolean;
        color?: string;
      };
      ambient?: {
        intensity?: number;
        color?: string;
      };
    };
  };
  series?: Array<{
    type: 'line' | 'bar' | 'pie' | 'scatter' | 'surface' | 'map' | 'heatmap';
    name?: string;
    coordinateSystem?: 'cartesian2d' | 'geo' | 'cartesian3D';
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
        shadowBlur?: number;
        opacity?: number;
      };
    };
    shading?: 'color' | 'lambert' | 'realistic';
    smooth?: boolean;
    lineStyle?: {
      color?: string;
      width?: number;
    };
  }>;
  dataZoom?: Array<{
    type?: 'slider' | 'inside';
    start?: number;
    end?: number;
    xAxisIndex?: number | number[];
    yAxisIndex?: number | number[];
  }>;
}
