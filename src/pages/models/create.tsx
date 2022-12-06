import { useEffect, useState } from "react";
import { HttpError, IResourceComponentsProps } from "@pankod/refine-core";

import {
    Create,
    Form,
    Input,
    useForm,
} from "@pankod/refine-antd";
import { Permission, Role } from "@pankod/refine-appwrite";


import { IModel, IModelVariables } from "interfaces";
import { authProvider } from "authProvider";

export const ModelCreate: React.FC<IResourceComponentsProps> = () => {
    const [identity, setIdentity] = useState<any>(undefined);
    useEffect(() => {
        (async () => {
            // @ts-ignore
            const identity = await authProvider?.getUserIdentity();
            setIdentity(identity)
        })()
    }, []);

    const { formProps, saveButtonProps } = useForm<
        IModel,
        HttpError,
        IModelVariables
    >({
    metaData: {
        readPermissions: [Permission.read(Role.user(identity?.$id))],
    },
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
                    label="Description"
                    name="description"
                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};
