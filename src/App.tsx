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
import {  InstanceList, InstanceCreate } from "pages/instances";
import { ModelCreate, ModelList } from "pages/models";


function App() {
  return (
    <Refine
      dataProvider={dataProvider(appwriteClient, {
          databaseId: "638a8005d4be3f624af3",
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
              name: "638a805f149df1f6e4e5",
              list: InstanceList,
              create: InstanceCreate,
              options: {
                  label: "Instance",
              },
          },
          {
              name: "638a800e3dea2c9b5aaa",
              list: ModelList,
              create: ModelCreate,
              options: {
                  label: "Model",
              },
          },
      ]}
    />
  );
}

export default App;
