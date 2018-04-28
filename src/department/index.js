import React from 'react';
import { Datagrid, List, TextField, Create, SimpleForm, NumberInput, TextInput, BooleanInput } from 'react-admin';
export const DepartmentList = props => (
    <List {...props} sort={{ field: 'seq', order: 'ASC' }}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="seq" />
        </Datagrid>
    </List>
);

export const DepartmentCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <NumberInput source="seq" />
            <BooleanInput source="enabled" />
        </SimpleForm>
    </Create>
);