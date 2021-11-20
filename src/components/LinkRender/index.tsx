import React from 'react';

interface LinkRenderProps {
  href: string;
}

const LinkRender: React.FC<LinkRenderProps> = props => (
  <a href={props.href} target="_blank">
    {props.children}
  </a>
);

export default LinkRender;
