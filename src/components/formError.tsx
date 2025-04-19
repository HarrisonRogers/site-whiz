import React from 'react';

type FormErrorProps = {
  errorMessage: string | undefined;
};

function FormError({ errorMessage }: FormErrorProps) {
  return <div className="text-red-500 text-sm">{errorMessage}</div>;
}

export default FormError;
