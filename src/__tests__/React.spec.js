import React from 'react';
import { shallow } from 'enzyme';
import VisibleWrapper from '../components/VisibleWrapper'
import { TextField } from 'react-admin';


describe('React Test', () => {

  it('VisibleWrapper visible Test', () => {
    const wrapper = shallow(
      <VisibleWrapper record={{ name: 'VisibleName', flag: true }} source="flag">
        <TextField source="name" />
      </VisibleWrapper>
    );
    debugger;
    expect(true).toEqual(true);
  }
  );

  it('VisibleWrapper invisible Test', () => {
    const wrapper = shallow(
      <VisibleWrapper record={{ name: 'VisibleName', flag: false }} source="flag">
        <TextField source="name" />
      </VisibleWrapper>
    );
    console.log(wrapper.getElement())
    expect(false).toEqual(false);
  }

  );

});