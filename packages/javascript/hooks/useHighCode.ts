import hljs from 'highlight.js';
import { useEffect } from 'react';

async function highlighthandle() {
  await hljs;
  let highlightList = document.querySelectorAll('code,pre');
  highlightList.forEach((block) => {
    hljs.highlightBlock(block as HTMLElement);
  });
}

const useHighCode = () => {
  useEffect(() => {
    highlighthandle();
  }, []);
};

export default useHighCode;
