import { useEffect } from 'react';

/**
 * A custom hook that automatically adjusts the height of a textarea based on its content
 * @param textAreaRef - Reference to the textarea element
 * @param value - The current value of the textarea
 */
const useAutoResizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
): void => {
  useEffect(() => {
    if (textAreaRef) {
      // Reset the height to ensure we get the correct scrollHeight
      textAreaRef.style.height = '0px';

      // Set the height to the scrollHeight to fit all content
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = `${scrollHeight}px`;
    }
  }, [textAreaRef, value]);
};

export default useAutoResizeTextArea;
