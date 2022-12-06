export interface IModel {
    id: string;
    name: string;
    description: string;
}

export interface IModelVariables {
    id: string;
    name: string;
    description: string;
}

export interface IInstance {
    id: string;
    name: string;
    modelId: string;
}

export interface IInstanceVariables {
    id: string;
    name: string;
    modelId: string;
}

export interface IFile {
    name: string;
    percent: number;
    size: number;
    status: "error" | "success" | "done" | "uploading" | "removed";
    type: string;
    uid: string;
    url: string;
}

