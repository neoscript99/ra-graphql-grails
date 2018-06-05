import React from 'react';
import {
    required, Datagrid, List, TextField, Create,
    SimpleForm, NumberInput, TextInput, BooleanInput,
    EditButton, Edit, BooleanField, ReferenceField, DeleteButton,
    ReferenceInput, SelectInput, Filter, NullableBooleanInput
} from 'react-admin';
import PersonIcon from '@material-ui/icons/Person'
import { connect } from 'react-redux';
import { dispatch } from 'redux';
import { crudGetList } from 'react-admin'

import VisibleWrapper from '../../components/VisibleWrapper'

const DeptSelectInput = connect((state, props) => {
    const { data, list } = state.admin.resources.Department;
    const choices = list.ids.map(id => data[id])
    return { ...props, choices }
})(SelectInput);

const UserFilter = props => (
    <Filter {...props}>
        <DeptSelectInput label="所属部门" source="dept.eq.id" optionText="name" optionValue="id" />
        <TextInput label="用户名" source="like.name" alwaysOn />
        <NullableBooleanInput label="是否启用" source="eq.enabled" />
        <NullableBooleanInput label="是否可编辑" source="eq.editable" />
    </Filter>
);

const UserList = props => (
    <List {...props} bulkActions={false} filters={<UserFilter />}>
        <Datagrid>
            <TextField source="account" />
            <TextField source="name" />
            <BooleanField source="editable" />
            <BooleanField source="enabled" />
            <TextField source="dept.name" />
            <VisibleWrapper source="editable">
                <EditButton />
                <DeleteButton />
            </VisibleWrapper>
        </Datagrid>
    </List>
);

const UserForm = (props) => (
    <SimpleForm {...props} redirect="list">
        <TextInput source="account" validate={required()} />
        <TextInput source="name" validate={required()} />
        <BooleanInput source="editable" defaultValue="true" />
        <BooleanInput source="enabled" defaultValue="true" />
        <DeptSelectInput source="dept.id" optionText="name" optionValue="id" />
    </SimpleForm>
);

const UserCreate = (props) => (
    <Create {...props}>
        <UserForm />
    </Create>
);

const UserEdit = props => (
    <Edit {...props}>
        <UserForm />
    </Edit>
);

export default { key: 'User', name: 'User', list: UserList, create: UserCreate, edit: UserEdit, icon: PersonIcon };