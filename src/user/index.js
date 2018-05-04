import React from 'react';
import {
    required, Datagrid, List, TextField, Create,
    SimpleForm, NumberInput, TextInput, BooleanInput,
    EditButton, Edit, BooleanField, ReferenceField
} from 'react-admin';
import PersonIcon from '@material-ui/icons/Person'

const UserList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="account" />
            <TextField source="name" />
            <BooleanField source="editable" />
            <BooleanField source="enabled" />
            <TextField source="dept.name" />
            <EditButton />
        </Datagrid>
    </List>
);


const UserForm = (props) => (
    <SimpleForm {...props} redirect="list">
        <TextInput source="account" validate={required()} />
        <TextInput source="name" validate={required()} />
        <BooleanInput source="editable" defaultValue="true" />
        <BooleanInput source="enabled" defaultValue="true" />
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