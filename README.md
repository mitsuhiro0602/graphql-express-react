# graphql-express-react

## socket通信してリアルタイム通信を行うためのモジュール(クライアント側に流す)

## SUBSCRIPTION(CLIENT)

install additional packages, not included in apollo-boost

```
npm install --save apollo-link apollo-link-context apollo-link-ws apollo-utilities subscriptions-transport-ws
```

```javascript
import { split } from "apollo-link";
import { setContext } from "apollo-link-context";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

// included in apollo boost
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";

```