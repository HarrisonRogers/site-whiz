import { Card } from '@/components/ui/card';
import { forwardRef } from 'react';
import { Message } from './chat';
type OutputProps = {
  messages: Message[];
};

const Output = forwardRef<HTMLDivElement, OutputProps>(function Output(
  { messages },
  ref
) {
  return (
    <Card className="min-h-[80vh] max-h-[80vh] overflow-y-auto">
      {/* Output */}
      {messages.map((message, index) => (
        <div key={index}>{message.content}</div>
      ))}
      <div ref={ref} />
    </Card>
  );
});

export default Output;
