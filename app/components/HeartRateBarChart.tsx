import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { HeartRateDataArray } from "~/types/HeartRate";

// Input data props
interface HeartRateBarChartProps 
{
    inputData : HeartRateDataArray;
}

export default function HeartRateBarChart(props : HeartRateBarChartProps) : JSX.Element
{
    return <BarChart width={1200} height={500} data={props.inputData}>
        <Bar dataKey="HeartRateP1" fill="#8884d8" />
        <Bar dataKey="HeartRateP2" fill="#82ca9d" />
        <Bar dataKey="HeartRateP3" fill="#ff0000" />
        <Bar dataKey="HeartRateP4" fill="#0000ff" />
        <XAxis dataKey="Timestamp" interval={200} />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
    </BarChart>
}
