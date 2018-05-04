import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import { CircularProgress } from 'material-ui';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import buildDataProvider from './dataProvider';
import chsMessages from './i18n/chs';
import resources from './resources'

const i18nProvider = locale => {
  if (locale === 'en') {
    return import('./i18n/en').then(messages => messages.default);
  }
  return chsMessages;
};

const authProvider = (type, params) => {
  // type can be any of AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, and AUTH_CHECK
  // ...
  return Promise.resolve();
};

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});
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
        <MuiThemeProvider theme={theme}>
          <CircularProgress size={60} thickness={7} />
        </MuiThemeProvider>);
    }

    return (
      <Admin
        title="React Admin & GORM-GraphQl"
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        authProvider={authProvider}
        locale="chs"
        theme={theme}
      >
        {
          resources.map(res =>
            <Resource {...res} />
          )
        }

      </Admin>
    )
  }
}

export default App;