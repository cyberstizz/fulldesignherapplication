// localStorageMock.js

const localStorageMock = (() => {
    let store = {};
  
    return {
        getItem: key => {
            console.log(`Getting item for key: ${key}`);
            return store[key] || null;
        },
        setItem: (key, value) => {
            console.log(`Setting item: ${key}=${value}`);
            store[key] = value.toString();
        },
      removeItem: key => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();
  
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  export default localStorageMock;

  