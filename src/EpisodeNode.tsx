import React, { FormEventHandler, FunctionComponent, memo } from "react";
import { Handle, Position, Node } from "reactflow";
import { Episode } from "./data";

type CustomNodeProps<A> = {
  id: string;
  data: A;
  type: string;
  xPos: number;
  yPos: number;
  zIndex: number;
  selected: boolean;
  sourcePosition: string;
  targetPosition: string;
  dragging: boolean;
  isConnectable: boolean;
  dragHandle: string;
};

type EpisodeNodeProps = CustomNodeProps<Episode>;

const parser = new DOMParser();

export const EpisodeNode: FunctionComponent<EpisodeNodeProps> = memo(
  ({ data }) => {
    return (
      <>
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: "#222", borderColor: "#222" }}
        />
        <div
          style={{
            width: "400px",
            backgroundColor: "#FAFAFA",
            border: "4px solid #222",
            borderRadius: "5px",
            color: "#222",
            overflow: "hidden",
            padding: "10px",
            fontFamily: "'Source Code Pro', monospace",
          }}
        >
          <span
            style={{
              fontWeight: 600,
            }}
          >
            {data.title}
          </span>{" "}
          • {data.publishedAt.toISOString().substring(0, 10)}
          <sup>
            <a
              href={`https://congressionaldish.com/${data.slug.replace(
                "-",
                ""
              )}`}
              style={{ color: "inherit", textDecoration: "inherit" }}
              target={"_blank"}
            >
              [&#8599;]
            </a>
          </sup>
          <p
            style={{
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data.preview ?? ""}
          </p>
        </div>
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: "#222", borderColor: "#222" }}
        />
      </>
    );
  }
);
