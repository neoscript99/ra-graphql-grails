import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import buildDataProvider from './dataProvider';
import { DepartmentList, DepartmentCreate, DepartmentEdit } from './department';
import chsMessages from './i18n/chs'

const i18nProvider = locale => {
  if (locale === 'en') {
    return import('./i18n/en').then(messages => messages.default);
  }
  return chsMessages;
};

class App extends Component {
  state = { dataProvider: null };

  async componentWillMount() {
    const dataProvider = await buildDataProvider();
    this.setState({ dataProvider });
  }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return (
        <MuiThemeProvider>
          <CircularProgress size={60} thickness={7} />
        </MuiThemeProvider>);
    }

    return (
      <Admin
        title="React Admin & GORM-GraphQl"
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        locale="chs"
      >
        <Resource name="Department" list={DepartmentList} create={DepartmentCreate} edit={DepartmentEdit} />
      </Admin>
    )
  }
}

export default App;