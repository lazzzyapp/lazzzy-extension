import React from 'react';

interface LinkRenderProps {
  href: string;
}

const LinkRender: React.FC<LinkRenderProps> = props => {
  return (
    <a title="link" rel="noopener noreferrer" href={props.href} target="_blank">
      {props.children}
    </a>
  );
};

export default LinkRender;
