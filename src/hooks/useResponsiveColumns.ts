import { useEffect, useRef, useState } from "react";

const getColumnCount = (width: number) => {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 640) return 2;
  return 1;
};

export const useResponsiveColumns = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(4);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const updateColumnCount = () => {
      setColumnCount(getColumnCount(wrapper.clientWidth));
    };

    updateColumnCount();

    const resizeObserver = new ResizeObserver(updateColumnCount);
    resizeObserver.observe(wrapper);

    return () => resizeObserver.disconnect();
  }, []);

  return {
    wrapperRef,
    columnCount,
  };
};