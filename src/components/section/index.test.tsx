import Section from './index';
import React from 'react';
import { render } from 'enzyme';
import '@wojtekmaj/enzyme-adapter-react-17';

describe('test Section', () => {
  it.skip('should render correct', () => {
    expect(
      render(
        <Section title="test">
          <div>test</div>
        </Section>
      )
    ).toMatchSnapshot();
  });
});
