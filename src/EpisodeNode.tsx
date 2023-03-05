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
          style={{ background: "#555" }}
        />
        <div
          style={{
            width: "300px",
            height: "160px",
            backgroundColor: "#FAFAFA",
            border: "4px solid #CCC",
            overflow: "hidden",
            padding: "10px",
          }}
        >
          <h3 style={{ fontFamily: "Gloock, serif" }}>
            {data.slug}: {data.title}{" "}
            <a
              href={`https://congressionaldish.com/${data.slug}`}
              style={{ color: "inherit", textDecoration: "inherit" }}
              target={"_blank"}
            >
              [&#8599;]
            </a>
          </h3>
          <p
            style={{
              display: "block",
              overflow: "hidden",
              maxHeight: "90px",
              textOverflow: "ellipsis",
            }}
          >
            {data.preview ?? ""}
          </p>
        </div>
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: "#555" }}
        />
      </>
    );
  }
);
