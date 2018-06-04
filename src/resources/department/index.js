import React from 'react';
import {
    required, Datagrid, List, TextField, Create,
    SimpleForm, NumberInput, TextInput, BooleanInput,
    EditButton, Edit, BooleanField, Filter, NullableBooleanInput
} from 'react-admin';
import GroupIcon from '@material-ui/icons/Group'

const DepartmentFilter = props => (
    <Filter {...props}>
        <NullableBooleanInput source="enabled" defaultValue />
    </Filter>
);

const DepartmentList = props => (
    <List {...props}
        sort={{ field: 'seq', order: 'ASC' }}
        bulkActions={false}
        filters={<DepartmentFilter />}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="seq" />
            <BooleanField source="enabled" />
            <EditButton />
        </Datagrid>
    </List>
);


const DepartmentForm = (props) => (
    <SimpleForm {...props} redirect="list">
        <TextInput source="name" validate={required()} />
        <NumberInput source="seq" validate={required()} />
        <BooleanInput source="enabled" defaultValue="true" />
    </SimpleForm>
);

const DepartmentCreate = (props) => (
    <Create {...props}>
        <DepartmentForm />
    </Create>
);

const DepartmentEdit = props => (
    <Edit {...props}>
        <DepartmentForm />
    </Edit>
);
export default { key: 'Department', name: 'Department', list: DepartmentList, create: DepartmentCreate, edit: DepartmentEdit, icon: GroupIcon };