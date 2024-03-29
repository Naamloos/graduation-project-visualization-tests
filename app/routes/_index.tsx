import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "react-router";
import { promises as fs } from "fs";
import { HeartRateDataArray, HeartRateDataPoint } from "~/types/HeartRate";
import HeartRateLineChart from "~/components/HeartRateLineChart";
import { useState } from "react";
import HeartRateBarChart from "~/components/HeartRateBarChart";

export const meta: MetaFunction = () => {
  return [
    { title: "graduation project visualization tests" },
    { name: "graduation project visualization tests", content: "Testing visualization" },
  ];
};

// Ran before rendering, loads data from a file
export async function loader()
{
  // Read CSV file, split by lines, skip first line
  const file : string = await fs.readFile("data/heart_rate.csv", "utf-8");
  let lines : string[] = file.split("\n");
  lines.shift();
  lines = lines.filter(x => x.length > 0); // Remove empty lines

  // Define output array to dump data into
  const output : HeartRateDataArray = [];

  // Parse each line into a HeartRateDataPoint, by 0.5 intervals
  let currentTimeStamp : number = 0.0;
  lines.forEach((lineToParse : string) => {
      const values : string[] = lineToParse.split(","); // Expected length is 4

      if(values.length !== 4)
      {
        // Invalid input data, skip this point.
        console.error("Invalid data point: " + lineToParse);
        return;
      }

      const currentDatapoint : HeartRateDataPoint = {
        Timestamp : currentTimeStamp,
        HeartRateP1 : parseInt(values[0]),
        HeartRateP2 : parseInt(values[1]),
        HeartRateP3 : parseInt(values[2]),
        HeartRateP4 : parseInt(values[3])
      };

      output.push(currentDatapoint);

      // Increment timestamp by 0.5
      currentTimeStamp += 0.5;
  });

  return output;
}

interface ChartSwitchProps
{
  option : ChartType;
  data : HeartRateDataArray;
}

enum ChartType
{
  Line = "line",
  Bar = "bar"
}

function ChartSwitch(props : ChartSwitchProps)
{
  switch (props.option)
  {
    case ChartType.Line:
      return <HeartRateLineChart inputData={props.data}/>
    case ChartType.Bar:
      return <HeartRateBarChart inputData={props.data}/>
    default:
      return <p>Invalid ChartType given: {props.option}</p>
  }
}

export default function Index() 
{
  const loadedData : HeartRateDataArray = useLoaderData() as HeartRateDataArray;

  const [selectedOption, setSelectedOption] = useState<ChartType>(ChartType.Line);

  return (
    <>
      <div style={{ fontFamily: "Comic Sans MS", lineHeight: "1.8" }}>
        <h1> Data Vis Tests </h1>

        Select a type of chart to display: &nbsp;
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value as ChartType)}>
          <option value={ChartType.Line}>Line Chart</option>
          <option value={ChartType.Bar}>Bar Chart</option>
        </select>

        <ChartSwitch option={selectedOption} data={loadedData}/>

      </div>
    </>
  );
}
