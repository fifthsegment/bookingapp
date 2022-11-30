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
import {  PostsList, PostsCreate } from "pages/posts";


function App() {
  return (
    <Refine
      dataProvider={dataProvider(appwriteClient, {
          databaseId: "638659048f13cd96cc0b",
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
              name: "6386590ddd1858fa046a",
              list: PostsList,
              create: PostsCreate,
              options: {
                  label: "Post",
              },
          },
      ]}
    />
  );
}

export default App;
