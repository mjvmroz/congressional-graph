import { Node, Edge } from "reactflow";

import episodes from "./episodes.json";
import { Fn } from "./Fn";
const typedEpisodes: JsonFile = episodes as any;

type Slug = string;

type JsonFile = {
  episodes: JsonEpisode[];
  adjacency_reduced_edges: [[number, number]];
  networks: [{ nodes: [number]; edges: [[number, number]] }];
};

type JsonEpisode = {
  number: number;
  slug: string;
  published_at: number;
  title: string;
  preview?: string;
};

const fromJson: Fn<JsonEpisode, Episode> = (jsonEpisode) => {
  const { number, slug, title, preview } = jsonEpisode;
  return {
    number,
    slug,
    publishedAt: new Date(jsonEpisode.published_at),
    title,
    preview,
  };
};

export type Episode = {
  number: number;
  slug: string;
  publishedAt: Date;
  title: string;
  preview?: string;
};

export type EpisodeGraph = {
  nodes: Node<Episode>[];
  edges: Edge[];
};

export const episodeGraph: EpisodeGraph = {
  nodes: typedEpisodes.episodes
    .sort((n1, n2) => n1.number - n2.number)
    .map((jsonEp) => ({
      id: jsonEp.number.toString(),
      data: fromJson(jsonEp),
      position: { x: 0, y: 0 },
      type: "episode",
    })),
  edges: typedEpisodes.adjacency_reduced_edges.map(([from, to]) => ({
    id: `ref:${from}=>${to}`,
    source: from.toString(),
    target: to.toString(),
    style: { stroke: "#222" },
  })),
};
