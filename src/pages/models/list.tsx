import {  IResourceComponentsProps } from "@pankod/refine-core";
import {
    List,
    Table,
    useTable,
    Space,
    EditButton,
    ShowButton,
    DeleteButton,
    Button,
} from "@pankod/refine-antd";

import { IModel } from "interfaces";
import { appwriteClient } from "appwriteClient";
import { databaseId, instanceCollectionId } from "config";
import { Databases, Query } from "@pankod/refine-appwrite";

export const ModelList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IModel>({
    });


    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="name" title="Name" sorter />
                <Table.Column<IModel>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton size="small" recordItemId={record.id} />

                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};