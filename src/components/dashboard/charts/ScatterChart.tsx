
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ScatterChart as RechartsScatterChart, Scatter, XAxis, YAxis, ZAxis, ResponsiveContainer } from 'recharts';
import { ScatterData } from '@/types/dashboard';

interface ScatterChartProps {
  data: ScatterData[];
}

/**
 * Scatter plot for correlation analysis
 */
export const ScatterChart = ({ data }: ScatterChartProps) => {
  const chartConfig = {
    x: {
      label: "X Axis",
      color: "hsl(var(--primary))"
    },
    y: {
      label: "Y Axis", 
      color: "hsl(var(--secondary))"
    }
  };

  const categoryA = data.filter(d => d.category === 'A');
  const categoryB = data.filter(d => d.category === 'B');
  const categoryC = data.filter(d => d.category === 'C');

  return (
    <Card className="animate-fade-in h-full">
      <CardHeader>
        <CardTitle className="text-base lg:text-lg">Correlation Analysis</CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-6 h-full">
        <ChartContainer config={chartConfig} className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis dataKey="x" type="number" name="X" tick={{ fontSize: 12 }} />
              <YAxis dataKey="y" type="number" name="Y" tick={{ fontSize: 12 }} />
              <ZAxis dataKey="z" type="number" range={[60, 400]} name="Size" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Scatter name="Category A" data={categoryA} fill="#8884d8" />
              <Scatter name="Category B" data={categoryB} fill="#82ca9d" />
              <Scatter name="Category C" data={categoryC} fill="#ffc658" />
            </RechartsScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
