import { AsyncStorage } from 'react-native';

/**
 * Action type
 */

const EFFECT_STORAGE = 'EFFECT_STORAGE';

/**
 * redux-storage
 */

function createStorage() {
  return dispatch => next => action =>
    action.type === EFFECT_STORAGE
      ? execute(action.payload)
      : next(action);

  function execute({ type, key, value }) {
    const store = AsyncStorage;
    switch (type) {
      case 'getItem':
        return Promise.resolve(store.getItem(key)).then(v => parseValue(v));
      case 'setItem':
        return Promise.resolve(store.setItem(key, JSON.stringify(value)));
      case 'mergeItem':
        return Promise.resolve(store.mergeItem(key, JSON.stringify(value)));
      case 'removeItem':
        return Promise.resolve(store.removeItem(key, value));
      case 'multiGet':
        // key format must be ['key1', 'key2']
        return Promise.resolve(store.multiGet(key)).then(v => return v);
      case 'multiSet':
        // key format must be [ ['key1', 'val1'], ['key2', 'val2']]
        return Promise.resolve(store.multiSet(key));
      case 'multiMerge':
        // key format must be [ ['key1', 'val1'], ['key2', 'val2']]
        return Promise.resolve(store.multiMerge(key));
      case 'multiRemove':
        // key format must be ['key1', 'key2']
        return Promise.resolve(store.multiRemove(key));
      case 'clear':
        return Promise.resolve(store.clear());
      default:
        throw new Error('redux-storage unknown storage action type');
    }
  }
}

function parseValue(value) {
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }

  return value; // just for consistency
}

/**
 * Action creator
 */

function createAction(payload) {
  return {
    type: EFFECT_STORAGE,
    payload,
  };
}

function getItem(key) {
  return createAction({ type: 'getItem', key });
}

function setItem(key, value) {
  return createAction({ type: 'setItem', key, value });
}

function removeItem(key) {
  return createAction({ type: 'removeItem', key });
}

function mergeItem(key, keyDelta) {
  return createAction({ type: 'mergeItem', key, keyDelta });
}

function multiGet(keys) {
  return createAction({ type: 'multiGet', keys });
}

function multiSet(keyValuePairs) {
  return createAction({ type: 'multiSet', keyValuePairs });
}

function multiRemove(keys) {
  return createAction({ type: 'multiRemove', keys });
}

function multiMerge(keyValuePairs) {
  return createAction({ type: 'multiMerge', keyValuePairs });
}

function clear() {
  return createAction({ type: 'clear' });
}

/**
 * Exports
 */

export default createStorage;
export {
  getItem,
  setItem,
  removeItem,
  mergeItem,
  multiGet,
  multiSet,
  multiRemove,
  multiMerge
  clear,
  STORAGE_TYPE,
};
