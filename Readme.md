
# redux-effects-asyncstorage

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Redux effects driver for React Native AsyncStorage

## Installation

    $ npm i https://github.com/shadye/redux-effects-asyncstorage --save

## Usage

Simple [redux-effects](https://github.com/redux-effects/redux-effects) driver for [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html#content).  Add it to your redux middleware stack like this:

```javascript
import asyncStorage from 'redux-effects-asyncStorage'

applyMiddleware(asyncStorage)(store)
```

And then use the action creators that come bundled with it:

```javascript
import asyncStorage from 'redux-effects-asyncStorage'

store.dispatch(asyncStorage.setItem('todos.0', 'Clean the kitchen'))
```

## License

The MIT License