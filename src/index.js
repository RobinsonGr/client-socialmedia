import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {storage} from "react-persist/lib/storage";
import {PersistGate} from "redux-persist/integration/react";
import {configureStore } from "@reduxjs/toolkit"
import {persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER} from "redux-persist"
import {reducer} from "state"


  //config localStorage
  const persistConfig = {key: "root", storage, version: 1}


  const persistedReducer = persistReducer(persistConfig, reducer )
  
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        //these actions are to avoid
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      },
    }),
    

  } )


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* ensure that the store is rehydrated with the persisted data before rendering */}
      <PersistGate loading={null} persistor={persistStore(store)}> 
       <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

