export interface HeartRateDataPoint 
{
    Timestamp: number;
    HeartRateP1: number;
    HeartRateP2: number;
    HeartRateP3: number;
    HeartRateP4: number;
}

export type HeartRateDataArray = HeartRateDataPoint[];