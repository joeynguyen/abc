import { useEffect } from 'react';
const useCreateLinkTag = resourceUrl => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = resourceUrl;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [resourceUrl]);
};

export default useCreateLinkTag;
