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

import { IPost, IPostVariables, ICategory } from "interfaces";
import { authProvider } from "authProvider";

export const PostsCreate: React.FC<IResourceComponentsProps> = () => {
    const [identity, setIdentity] = useState<any>(undefined);
    useEffect(() => {
        (async () => {
            // @ts-ignore
            const identity = await authProvider?.getUserIdentity();
            setIdentity(identity)
        })()
    }, []);

    const { formProps, saveButtonProps } = useForm<
        IPost,
        HttpError,
        IPostVariables
    >({
    metaData: {
        writePermissions: [Permission.read(Role.user(identity?.$id))],
        readPermissions: [Permission.read(Role.user(identity?.$id))],
    },
});


    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "6387d3dca5fd9352ca4f",
        optionLabel: "title",
        optionValue: "id",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) => {
                    formProps.onFinish?.({
                        ...values,
                        images: JSON.stringify(values.images),
                    });
                }}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <MDEditor data-color-mode="light" />
                </Form.Item>
            </Form>
        </Create>
    );
};
