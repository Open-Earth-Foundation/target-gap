import { Target } from "./models"

// returns the next target for the given actor
// returns null if there is no next target

export function actorNextTarget(actorDetails: any): any {
    return {
        target_id: `FAKE:madeup:${actorDetails['actor_id']}}`,
        target_type: "Absolute emission reduction",
        baseline_year: 2005,
        baseline_value: null,
        target_year: 2030,
        target_value: "40",
        target_unit: "percent",
    }
}

// returns the actor's emissions for the given year
// if it's in the future set in the actor emissions, it will be
// calculated from the actor's targets

export function actorEmissions(actorDetails: any, year: number): number {
    return (actorDetails.type == 'country') ? 100000000: 1000000;
}

// returns the actor's emissions reductions between the given
// years.

export function actorReductions(actorDetails: any, from: number, to: number): number {
    return (actorDetails.type == 'country') ? 30000000: 300000;
}

// returns the actor's emissions levels to comply with the
// paris agreement to meet the 1.5 degree target

export function paris15Level(actorDetails: any): number {
    return (actorDetails.type == 'country') ? 80000000: 800000;
}

// returns the actor's emissions levels to comply with the
// paris agreement to meet the 1.5 degree target

export function paris20Level(actorDetails: any): number {
    return (actorDetails.type == 'country') ? 90000000: 900000;
}