import {
  ActorEmissionsMap,
  ActorOverview,
  ActorPart,
  ActorPathSegment,
  CoverageData,
} from "./models";

const API_URL = `https://openclimate.network/api/v1`;
export const BASE_URL = `https://openclimate.network/`;
async function fetchAPI(
  route: String,
  params: Record<string, any> = {}
): Promise<Record<string, any>> {
  const paramString =
    Object.keys(params).length > 0 ? "?" + new URLSearchParams(params) : "";

  try {
    const res = await fetch(API_URL + route + paramString, {
      method: "GET",
    });

    if (res.status >= 400) {
      console.error("Failed to load request", route + paramString);
      console.error(`Status: ${res.status} ${res.statusText}`);
      console.error(await res.text());
      throw new Error("Failed to fetch API data! No JSON present");
    }

    const json = await res.json();

    if (!json.success) {
      console.error(json.message);
      throw new Error("Failed to fetch API data! Cause: " + json.message);
    }

    return json.data;
  } catch (err) {
    console.error("Failed to load request", route + paramString);
    console.error(err);
    throw err;
  }
}

export async function getActorParts(
  actorId: string,
  partType: string | undefined = undefined
): Promise<ActorPart[]> {
  const params = partType !== undefined ? { part_type: partType } : {};
  return (await fetchAPI(`/actor/${actorId}/parts`, params)) as Promise<
    ActorPart[]
  >;
}

export async function getActorPath(
  actorId: string
): Promise<ActorPathSegment[]> {
  return (await fetchAPI(`/actor/${actorId}/path`)) as Promise<
    ActorPathSegment[]
  >;
}

export async function getActorOverview(
  actorId: string
): Promise<ActorOverview> {
  return (await fetchAPI(`/actor/${actorId}`)) as Promise<ActorOverview>;
}

export async function getActorEmissions(
  actorId: string
): Promise<ActorEmissionsMap> {
  return (await fetchAPI(
    `/actor/${actorId}/emissions`
  )) as Promise<ActorEmissionsMap>;
}

export function getActorEmissionsDownloadURL(actorId: string): string {
  return API_URL + `/download/${actorId}-emissions.csv`;
}

export async function getCoverageData(): Promise<CoverageData> {
  const res = await fetch(API_URL + `/coverage/stats`);
  const data = await res.json();

  return data;
}
