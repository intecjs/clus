import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  if (inline) {
    return <code className={className}>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className || '');
  const lang = match && match[1] ? match[1] : '';
  return (
    <SyntaxHighlighter
      style={a11yDark}
      // cf. Enabling line wrap with React-Syntax-Highlighter?
      // https://stackoverflow.com/questions/62492403/enabling-line-wrap-with-react-syntax-highlighter
      lineProps={{
        style: {
          wordBreak: 'break-all',
          whiteSpace: 'pre-wrap',
          fontSize: 'small',
        },
      }}
      language={lang}
      wrapLines={true}
      className={className}
      // eslint-disable-next-line react/no-children-prop
      children={String(children).replace(/\n$/, '')}
    />
  );
};

export default CodeBlock;
