# Map OpenAI

This project is a example of a integration with OpenAI API to generate some locations and view on map.

It using libraries such as Mapbox and Maplibre to render the map and openai API do suggest the locations.

As commented above, this app wil provide a example of:

![first gif](images/openai.gif)
![second gif](images/openai-2.gif)

## OpenAI

OpenAI has trained cutting-edge language models that are very good at understanding and generating text. Our API provides access to these models and can be used to solve virtually any task that involves processing language.

You can generate you API KEY on: https://platform.openai.com/account/api-keys

## Environments

It should create a `.env` file with bellow api keys

| Environment            | Description                                  |
| ---------------------- | -------------------------------------------- |
| VITE_MAP_TILER_API_KEY | API Key of Maptiler to provide the map style |
| VITE_OPENAI_API_KEY    | API Key of OPEN AI                           |

## Pre-requisites

- Node
- Yarn or NPM

## How to run?

1. Install dependencies

```sh
yarn
```

or

```sh
npm install
```

2. Running the project

```sh
yarn dev
```

or

```sh
npm run dev
```

## About Project

It will be using some tools:

- Vite: frontend tooling
- Tailwind: styling
- MapTiler: map style provider
- React Map GL: maps component
- Mapbox/Maplibre: Map client
- OpenAI: AI to generate locations
