import { Node, Edge } from "reactflow";

import episodes from "./episodes.json";
const typedEpisodes: Record<Slug, Episode> = episodes as never;

type Slug = string;

type Episode = {
  slug: Slug;
  title: string;
  pointers: Slug[];
  description?: string; // HTML
};

type EpisodeGraph = {
  nodes: Node[];
  edges: Edge[];
};

export const episodeGraph: EpisodeGraph = Object.values(typedEpisodes).reduce(
  (graph: EpisodeGraph, episode: Episode) => {
    const { slug, title, pointers } = episode;
    const node: Node = {
      id: slug,
      data: { label: title },
      position: { x: 0, y: 0 },
      width: 320,
      height: 180,
    };
    const edges: Edge[] = pointers.map((pointer: Slug) => ({
      id: `ref:${slug}-${pointer}`,
      source: slug,
      target: pointer,
    }));
    return {
      nodes: [...graph.nodes, node],
      edges: [...graph.edges, ...edges],
    };
  },
  { nodes: [], edges: [] }
);
