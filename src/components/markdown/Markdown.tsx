import ReactMarkdown from 'react-markdown';
import CodeBlock from '@components/markdown/CodeBlock';
import styles from './Markdown.module.scss';

const Markdown: React.FC<{ children: string }> = ({ children }) => {
  return (
    <ReactMarkdown
      components={{
        code: CodeBlock,
      }}
      className={styles.markdown}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
