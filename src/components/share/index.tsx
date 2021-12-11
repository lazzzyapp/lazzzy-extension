import React from 'react';
import IconFont from '@/components/IconFont';
interface ShareProps {
  content: string;
}
const Share: React.FC<ShareProps> = ({ content: originContent }) => {
  const content = encodeURIComponent(originContent.slice(0, 200));
  const url = encodeURIComponent('https://lazzzy.app');

  const twitterHref = `https://twitter.com/intent/tweet?via=lazzzyapp&text=${content}&url=${url}`;

  return (
    <div style={{ fontSize: 20 }}>
      <a title="link" rel="noopener noreferrer" target="_blank" href={twitterHref}>
        <IconFont type="twitter" />
      </a>
    </div>
  );
};
export default Share;
