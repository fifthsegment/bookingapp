import { useMany, IResourceComponentsProps } from "@pankod/refine-core";
import {
    List,
    Table,
    TextField,
    useTable,
    Space,
    EditButton,
    ShowButton,
    getDefaultSortOrder,
    DeleteButton,
} from "@pankod/refine-antd";

import { IInstance, IModel } from "interfaces";
import { modelCollectionId } from "config";

export const InstanceList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IInstance>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.modelId) ?? [];
    const { data, isLoading } = useMany<IModel>({
        resource: modelCollectionId,
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="name" title="Name" sorter />
                <Table.Column
                    dataIndex="modelId"
                    title="Model"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.name
                                }
                            />
                        );
                    }}
                />
                <Table.Column<IInstance>
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