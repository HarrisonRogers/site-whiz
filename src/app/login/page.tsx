import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { FormProvider } from 'react-hook-form';

function page() {
  return (
    // <FormProvider>
    <form className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
      <Button variant="outline" type="submit">
        Login
      </Button>
    </form>
    // </FormProvider>
  );
}

export default page;
