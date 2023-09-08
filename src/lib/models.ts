export enum ActorType {
  Planet = "planet",
  Country = "country",
  Adm1 = "adm1",
  Adm2 = "adm2",
  City = "city",
  Organization = "organization",
  Site = "site",
}

export interface ActorPart {
  actor_id: string;
  name: string;
  type: ActorType;
  has_data: boolean;
  has_children: boolean;
  children_have_data: boolean;
}

export interface ActorPathSegment {
  actor_id: string;
  name: string;
  type: ActorType;
}

export interface Tag {
  tag_id: string;
  tag_name: string;
}

export interface DataSource {
  datasource_id: string;
  name: string;
  published: string; // TODO Date
  URL: string;
}

export interface EmissionsSource {
  datasource_id: number;
  name: string;
  publisher: string;
  published: string; // TODO Date
  URL: string;
  citation: string;
  tags: Tag[];
  data: EmissionsEntry[];
  population: PopulationData[];
  gdp: GdpData[];
  targets: Target[];
}

export interface EmissionsEntry {
  year: number;
  total_emissions: number;
  tags: Tag[];
}

export interface PopulationData {
  population: number;
  year: number;
  datasource_id: string;
  datasource: DataSource;
}

export interface GdpData {
  gdp: number;
  year: number;
  datasource_id: string;
  datasource: DataSource;
}

export interface Target {
  target_id: string;
  target_type: string;
  baseline_year: number;
  baseline_value: number | null;
  target_year: number;
  target_value: string;
  target_unit: string;
  is_net_zero: boolean;
  percent_achieved: number;
  percent_achieved_reason: PercentAchievedReason;
  datasource_id: string;
  datasource: TargetDatasource;
  initiative: Initiative;
}

export interface TargetDatasource {
  datasource_id: string;
  name: string;
  publisher: string;
  published: string; // TODO Date
  URL: string;
  created: string; // TODO Date
  last_updated: string; // TODO Date
}

export interface Initiative {
  initiative_id: string;
  name: string;
  description: string;
  URL: string;
}

export interface PercentAchievedReason {
  baseline: EmissionsRecord;
  current: EmissionsRecord;
  target: TargetEmissions;
}

export interface EmissionsRecord {
  year: number;
  value: number;
  datasource: BaselineDatasource;
}

export interface BaselineDatasource {
  datasource_id: string;
  name: string;
  published: string; // TODO Date
  URL: string;
}

export interface TargetEmissions {
  value: number;
}

export interface ActorOverview {
  actor_id: string;
  name: string;
  type: ActorType;
  is_part_of: number;
  area: number;
  lat: number;
  lng: number;
  emissions: Record<string, EmissionsSource>;
  targets: Target[];
}

export interface ActorEmissions {
  datasource_id: string;
  name: string;
  publisher: string;
  published: string; // TODO Date
  URL: string;
  tags: Tag[];
  data: EmissionsData[];
}

export interface EmissionsData {
  year: number;
  total_emissions: number;
  tags: Tag[];
}

export interface CoverageData {
  number_of_countries: number;
  number_of_regions: number;
  number_of_cities: number;
  number_of_countries_with_targets: number;
  number_of_regions_with_targets: number;
  number_of_cities_with_targets: number;
  number_of_countries_with_emissions: number;
  number_of_regions_with_emissions: number;
  number_of_cities_with_emissions: number;
}

export interface CoverageDiagramEntry {
  name: string;
  Emissions: number;
  Pledges: number;
}

export type ActorEmissionsMap = Record<string, ActorEmissions>;
