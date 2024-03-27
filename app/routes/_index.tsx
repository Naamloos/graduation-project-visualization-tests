import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "react-router";
import { promises as fs } from "fs";
import { HeartRateDataArray, HeartRateDataPoint } from "~/types/HeartRate";
import HeartRateLineChart from "~/components/HeartRateLineChart";

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

export default function Index() 
{
  const loadedData : HeartRateDataArray = useLoaderData() as HeartRateDataArray;

  return <>
      <div style={{ fontFamily: "Comic Sans MS", lineHeight: "1.8" }}>
        <h1> Data Vis Tests </h1>
        <HeartRateLineChart inputData={loadedData}/>
        <p>battle royale</p>
      </div>
    </>
}
