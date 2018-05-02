import React from 'react';
import {
    required, Datagrid, List, TextField, Create,
    SimpleForm, NumberInput, TextInput, BooleanInput,
    EditButton, Edit
} from 'react-admin';
export const DepartmentList = props => (
    <List {...props} sort={{ field: 'seq', order: 'ASC' }}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="seq" />
            <EditButton />
        </Datagrid>
    </List>
);


export const DepartmentCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <NumberInput source="seq" validate={required()} />
            <BooleanInput source="enabled" defaultValue="true" />
        </SimpleForm>
    </Create>
);

export const DepartmentEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <NumberInput source="seq" validate={required()} />
            <BooleanInput source="enabled" defaultValue="true" />
        </SimpleForm>
    </Edit>
);
