export interface WHORecord {
    SpatialDim: string;
    TimeDim?: number | string;
    Year?: number | string;
    NumericValue?: number;
    Value?: number;
    [key: string]: any; 
}

export interface HealthSummary {
    country: string | null;
    year: number | null;
    value: number | null;
    indicatorName?: string;
    source?: string;
    raw?: WHORecord;
}

export interface HealthResult {
    records: WHORecord[];
    summary: HealthSummary | null;
}