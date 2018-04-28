import React from 'react';
import { Datagrid, List, TextField } from 'react-admin';
export const DepartmentList = props => (
    <List {...props} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid>
            <TextField source="name" style={{ padding: '0 12px 0 25px' }} />
            <TextField source="seq" style={{ padding: '0 12px 0 25px' }} />
        </Datagrid>
    </List>
);
