# GraphQL Subscriptions Example

This repository contains an example React app using the Strise Process API for streaming updates about companies. Most of the code can be used in a server application as well.

A deployed version of the app can be found [here](https://files.strise.ai/graphql-subscriptions-example).

## GraphQL WebSocket Protocol

The Strise Process API adheres to the [graphql-transport-ws](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) protocol and clients must follow this specification. The [`graphql-ws`](https://github.com/enisdenjo/graphql-ws) NPM package supports this out of the box.

## Authentication

The client authenticates against the API using a [JSON Web Token](https://jwt.io/). The token must be included in the payload of the initial message.

```json
{
  "type":"connection_init",
  "payload":{
    "Authorization":"Bearer token"
  }
}
```

When using Apollo this the token is provided as in the example [`src/utils/client.tsx`](src/utils/client.tsx).

## API documentation

The API documentation can be viewed in the hosted [GraphQL Playground](https://graphql.strise.ai/process/graphiql), or with any other GraphQL client / documentation explorer.

## Codegen

One advantage of using a strongly typed API is that it is possible to generate custom types based on the current integration.

In this example [`graphql-codegen`](https://graphql-code-generator.com/) is used to generate TypeScript types based on the GraphQL operations specified in the files in `src/graphql`. The configuration can be found in `codegen.yml`.

`graphql-codegen` also has plugins for generating types in other languases such as Java or C#. Alternative codegen tools might also support other languages.

## Development

1. Install dependencies `npm install`
2. Start the development server `npm run start:stage`
