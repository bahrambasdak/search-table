import React, { useEffect, useReducer, useState } from "react";
import { Divider, Modal, Select } from "antd";
import CURD_Form from "./components/form";
import UserTable from "./components/table";
import { createNewUser, deleteUser, editUser, getUsers } from "./api";
import { useMutation } from "react-query";
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
const initFormData = {};
const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const [showModalForm, setShowNodalForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [formMode, setFormMode] = useState("add");
  const newUserMutation = useMutation(createNewUser);
  const editUserMutation = useMutation(editUser);
  const deleteUserMutation = useMutation(deleteUser);
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(2);

  const handleFormData = (e) => {
    console.log(e.currentTarget.getAttribute("data-fieldType"), "dfgdfg");
    setFormData((prev) => ({
      ...prev,
      [e.currentTarget.getAttribute("data-fieldType")]: e.target.value,
    }));
  };

  const closeFormModal = () => {
    setShowNodalForm(false);
  };
  const openFormModal = () => {
    setShowNodalForm(true);
  };

  const onAdd = () => {
    setFormMode("add");
    openFormModal();
  };
  const onEdit = (data) => {
    setFormMode("edit");
    openFormModal();
    console.log(data);
    setFormData(data);
  };
  const onDelete = (data) => {
    setFormMode("delete");
    openFormModal();
    console.log(data);
    setFormData(data);
  };

  const handleSubmitForm = (values, mode) => {

    switch (mode) {
      case "add":
        newUserMutation.mutate(values);
        break;
      case "edit":
        editUserMutation.mutate(values);
        break;
      case "delete":
        deleteUserMutation.mutate(values.id);
        break;
      default:
        break;
    }
    closeFormModal();
    console.log(values, mode);
  };
  useEffect(() => {
    getUsers().then((res) => {
      setDataSource(res);
      console.log(res);
    });
  }, []);

  return (
    <div>
      <Modal open={showModalForm} onCancel={closeFormModal}>
        <CURD_Form
          mode={formMode}
          data={formData}
          setData={handleFormData}
          onFinish={handleSubmitForm}
        />
      </Modal>
      <Select
        mode="multiple"
        placeholder="Inserted are removed"
        value={selectedItems}
        onChange={setSelectedItems}
        style={{
          width: "100%",
        }}
        options={filteredOptions.map((item) => ({
          value: item,
          label: item,
        }))}
      />
      <UserTable
        onAdd={onAdd}
        dataSource={dataSource}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};
export default App;
