import { useEffect, useState } from "react";
import { HttpError, IResourceComponentsProps } from "@pankod/refine-core";

import {
    Create,
    Form,
    Input,
    Select,
    Upload,
    useForm,
    useSelect,
    RcFile,
} from "@pankod/refine-antd";
import { Permission, Role } from "@pankod/refine-appwrite";

import MDEditor from "@uiw/react-md-editor";

import {  IInstanceVariables, IModel, IInstance } from "interfaces";
import { authProvider } from "authProvider";
import { modelCollectionId } from "config";

export const InstanceCreate: React.FC<IResourceComponentsProps> = () => {
    const [identity, setIdentity] = useState<any>(undefined);
    useEffect(() => {
        (async () => {
            // @ts-ignore
            const identity = await authProvider?.getUserIdentity();
            setIdentity(identity)
        })()
    }, []);

    const { formProps, saveButtonProps } = useForm<
        IInstance,
        HttpError,
        IInstanceVariables
    >({
    metaData: {
        writePermissions: [Permission.write(Role.user(identity?.$id))],
        readPermissions: [Permission.read(Role.user(identity?.$id))],
    },
});


    const { selectProps: categorySelectProps } = useSelect<IModel>({
        resource: modelCollectionId,
        optionLabel: "name",
        optionValue: "id",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Model"
                    name="modelId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                
            </Form>
        </Create>
    );
};
