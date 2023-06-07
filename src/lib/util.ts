import { Target } from "./models"

const dsq = {
    "ECCC:GHG_inventory:2022-04-13": 0.9,
    "EPA:state_GHG_inventory:2022-08-31": 0.8,
    "PRIMAP:10.5281/zenodo.7179775:v2.4": 0.8,
    "UNFCCC:GHG_ANNEX1:2019-11-08": 0.9,
    "WRI:climate_watch_historical_ghg:2022": 0.7
};

// returns the next target for the given actor
// returns null if there is no next target

export function actorNextTarget(actorDetails: any): Target | null {
    return actorTargetAfter(actorDetails, (new Date()).getFullYear());
}

export function actorTargetAfter(actorDetails: any, year: number): Target | null {
    const filtered = actorDetails.targets
        .filter((target: any) => target.target_type == "Absolute emission reduction" && target.target_year >= year);
    const sorted = filtered
        .sort((a: any, b: any) => (a.target_year > b.target_year) ? 1 :
            (a.target_year < b.target_year) ? -1 :
            parseFloat(a.target_value) - parseFloat(b.target_value))
    if (sorted.length > 0) {
        return sorted[0]
    } else {
        return null
    }
}

// returns the actor's emissions for the given year
// if it's in the future set in the actor emissions, it will be
// calculated from the actor's targets

export function actorEmissions(actorDetails: any, year: number): number {
    if (year < (new Date()).getFullYear()) {
        return actorEmissionsPast(actorDetails, year);
    } else {
        return actorEmissionsFuture(actorDetails, year);
    }
}

function actorEmissionsPast(actorDetails: any, year: number): number {
    let values = []
    for (let datasource_id in actorDetails.emissions) {
        const datasource = actorDetails.emissions[datasource_id];
        const emissions = datasource.data.find((emission: any) => emission.year == year);
        if (emissions) {
            const quality = (datasource_id in dsq) ? dsq[datasource_id] : 0.0;
            values.push({total_emissions: emissions.total_emissions, quality: quality});
        }
    }
    let sorted = values.sort((a: any, b: any) => b.quality - a.quality);
    return (sorted) ? sorted[0].total_emissions : null;
}

function actorEmissionsFuture(actorDetails: any, year: number): number {
    const target = actorTargetAfter(actorDetails, year);
    if (target) {
        const emissions = actorEmissionsPast(actorDetails, target.baseline_year);
        const total_reduction = (target.target_unit == "percent") ?
            ((parseFloat(target.target_value) / 100) * emissions) :
            parseFloat(target.target_value);
        const reduction_for_year = ((year - target.baseline_year) / (target.target_year - target.baseline_year)) * total_reduction;
        return emissions - reduction_for_year;
    } else {
        // Get the most recent emissions value
        for (year = (new Date()).getFullYear() - 1; year > 1990; year--) {
            const emissions = actorEmissionsPast(actorDetails, year);
            if (emissions) {
                return emissions;
            }
        }
        return Infinity;
    }
}

// returns the actor's emissions reductions between the given
// years.

export function actorReductions(actorDetails: any, from: number, to: number): number {
    const target = actorTargetAfter(actorDetails, to);
    if (target) {
        const from_emissions = actorEmissions(actorDetails, from);
        const to_emissions = actorEmissions(actorDetails, to);
        return Math.max(from_emissions - to_emissions, 0.0);
    } else {
        return 0.0;
    }
}

// returns the actor's emissions levels to comply with the
// paris agreement to meet the 1.5 degree target
// per @lgloege 's comment here:
// https://github.com/Open-Earth-Foundation/ambition-gaps/blob/main/notebooks/utils.py
// emissions required to be in line with AR6
// 1.5C : 43% reduction from 2019 levels by 2030

export function paris15Emissions(actorDetails: any): number {
    const emissions = actorEmissions(actorDetails, 2019);
    return (emissions) ? Math.round(emissions * 0.57) : 0.0;
}

// returns the actor's emissions levels to comply with the
// paris agreement to meet the 1.5 degree target
// per @lgloege 's comment here:
// https://github.com/Open-Earth-Foundation/ambition-gaps/blob/main/notebooks/utils.py
// emissions required to be in line with AR6
// 1.5C : 27% reduction from 2019 levels by 2030

export function paris20Emissions(actorDetails: any): number {
    const emissions = actorEmissions(actorDetails, 2019);
    return (emissions) ? Math.round(emissions * 0.73) : 0.0;
}
