import { Node, Edge } from "reactflow";

import episodes from "./episodes.json";
import { Fn } from "./Fn";
const typedEpisodes: Record<Slug, JsonEpisode> = episodes as never;

type Slug = string;

type JsonEpisode = {
  slug: Slug;
  published_at: number;
  title: string;
  pointers: Slug[];
  preview?: string;
};

const fromJson: Fn<JsonEpisode, Episode> = (jsonEpisode) => {
  const { slug, title, pointers, preview } = jsonEpisode;
  return {
    slug,
    publishedAt: new Date(jsonEpisode.published_at),
    title,
    pointers,
    preview,
  };
};

export type Episode = {
  slug: Slug;
  publishedAt: Date;
  title: string;
  pointers: Slug[];
  preview?: string;
};

export type EpisodeGraph = {
  nodes: Node<Episode>[];
  edges: Edge[];
};

const slugNumber = (slug: Slug) => Number(slug.split("CD-")[1]);

export const episodeGraph: EpisodeGraph = Object.values(typedEpisodes).reduce(
  (graph: EpisodeGraph, jsonEp: JsonEpisode) => {
    const { slug, pointers } = jsonEp;
    const node: Node = {
      id: slug,
      data: fromJson(jsonEp),
      position: { x: 0, y: 0 },
      type: "episode",
    };
    const edges: Edge[] = pointers.map((pointer: Slug) => ({
      id: `ref:${slug}=>${pointer}`,
      source: slug,
      target: pointer,
      // TODO: custom types
      // type: "ref",
    }));
    return {
      nodes: [...graph.nodes, node],
      edges: [...graph.edges, ...edges],
    };
  },
  { nodes: [], edges: [] }
);
