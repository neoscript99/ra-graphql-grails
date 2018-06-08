import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import { CircularProgress, MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import buildDataProvider from './dataProvider';
import authProvider from './authProvider';
import chsMessages from './i18n/chs';
import resources from './resources'
import afterLoginSaga from './sagas/afterLoginSaga'

const i18nProvider = locale => {
  if (locale === 'en') {
    return import('./i18n/en').then(messages => messages.default);
  }
  return chsMessages;
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
        customSagas={[afterLoginSaga]}
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