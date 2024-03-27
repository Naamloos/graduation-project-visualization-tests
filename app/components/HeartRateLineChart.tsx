import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { HeartRateDataArray } from "~/types/HeartRate";

// Input data props
interface HeartRateLineChartProps 
{
    inputData : HeartRateDataArray;
}

export default function HeartRateLineChart(props : HeartRateLineChartProps) : JSX.Element
{
    return <>
        <LineChart width={1200} height={500} data={props.inputData}>
            <Line type="monotone" stroke="#8884d8" dataKey="HeartRateP1" dot={false}/>
            <Line type="monotone" stroke="#82ca9d" dataKey="HeartRateP2" dot={false}/>
            <Line type="monotone" stroke="#ff0000" dataKey="HeartRateP3" dot={false}/>
            <Line type="monotone" stroke="#0000ff" dataKey="HeartRateP4" dot={false}/>
            <XAxis dataKey="Timestamp" interval={200}/>
            <YAxis/>
            <CartesianGrid stroke="#ccc" />
        </LineChart>
    </>
}
