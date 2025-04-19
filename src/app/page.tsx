import UploadForm from './uploadForm';
import Output from './output';

export default function Home() {
  return (
    <section className="mt-10">
      <h1 className="text-4xl font-bold text-center">Site Whiz</h1>
      <p className="text-center">
        Analyze your construction site with a few clicks
      </p>
      <div className="grid grid-cols-2 gap-4 mt-10">
        {/* Input */}
        <UploadForm />
        {/* Output */}
        <Output />
      </div>
    </section>
  );
}
