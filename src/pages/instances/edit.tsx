import React from "react";

import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    Edit,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
} from "@pankod/refine-antd";


import { IInstance, IModel } from "interfaces";
import { modelCollectionId } from "config";

export const InstanceEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<IInstance>();

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<IModel>({
        resource: modelCollectionId,
        optionLabel: "name",
        optionValue: "id",
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
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
        </Edit>
    );
};