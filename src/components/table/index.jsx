import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
const EditableContext = React.createContext(null);
const Row = ({ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const Cell = ({ children, ...restProps }) => {
  return <td {...restProps}>{children}</td>;
};

const UserTable = ({
  onAdd = () => {},
  dataSource = [],
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const defaultColumns = [
    {
      title: "name",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
        title: "website",
        dataIndex: "website",
      },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div style={{display:'flex',gap:'20px'}}>
            <Button
              onClick={() => onEdit(record)}
              type="primary"
              style={{
                marginBottom: 16,
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(record)}
              type="primary"
              style={{
                marginBottom: 16,
              }}
            >
              Delete
            </Button>
          </div>
        ) : null,
    },
  ];


  const components = {
    body: {
      row: Row,
      cell: Cell,
    },
  };
  const columns = defaultColumns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });
  return (
    <div>
      <Button
        onClick={onAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add new user
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};
export default UserTable;
