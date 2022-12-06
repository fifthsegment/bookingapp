import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";

import { dataProvider, liveProvider } from "@pankod/refine-appwrite";
import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";
import { appwriteClient } from "./appwriteClient";
import { authProvider } from "./authProvider";
import { Login } from './pages/login'
import {  InstanceList, InstanceCreate, InstanceEdit } from "pages/instances";
import { ModelCreate, ModelList } from "pages/models";
import { databaseId, instanceCollectionId, modelCollectionId } from "config";


function App() {
  return (
    <Refine
      dataProvider={dataProvider(appwriteClient, {
          databaseId: databaseId,
      })}      
      authProvider={authProvider}
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      LoginPage={Login}
      resources={[
          {
              name: instanceCollectionId,
              list: InstanceList,
              edit: InstanceEdit,
              create: InstanceCreate,
              options: {
                  label: "BookableEntity",
              },
          },
          {
              name: modelCollectionId,
              list: ModelList,
              create: ModelCreate,
              options: {
                  label: "EntityType",
              },
          },
      ]}
    />
  );
}

export default App;
