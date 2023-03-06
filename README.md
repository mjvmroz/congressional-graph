# Congressional Graph

A graph visualization of [Congressional Dish](https://congressionaldish.com) episode references.

It's one of my favourite podcasts, and increasingly it feels like there are a lot of links to keep track of. I blame Jen for finding so many of the world's problems. Anyway, seemed a good opportunity to play around with graphs.

I think if I do much more work on this it'll be focused on subgraph views rather than macro, but starting with a render of an adjacency-reduced graph seemed solid.

Data is fetched from the RSS feed and parsed into a graph [separately](https://github.com/mjvmroz/dish-scraper), then rendered using [React Flow](https://reactflow.dev/).

## Toolchain

- [Node](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

## Setup and go

```bash
yarn
yarn dev
```
