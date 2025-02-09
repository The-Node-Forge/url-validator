---
title: API Reference
description: API parameters, returns, examples.
sidebar_position: 4
---

### `functionName(param1, param2)`

Description of function.

**Parameters:**

- `param1` - Type - Description
- `param2` - Type - Description

**Returns:**

- Return Type - Description

**Examples:**

```js
functionName(arg1, arg2);
```

```js
const { greet } = require('./packageName');

console.log(greet('Charlie')); // Output: Hello, Charlie!
```

```js
import React from 'react';
import { greet } from './packageName';

const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return <h1>{greet(name)}</h1>;
};

export default Greeting;

```
