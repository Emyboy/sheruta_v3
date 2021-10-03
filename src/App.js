import React, { useEffect } from 'react';
import Router from './Router'

function App() {
  useEffect(() => {
    caches
        .keys()
        .then((keyList) =>
            Promise.all(keyList.map((key) => caches.delete(key))),
        );
  },[])
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
