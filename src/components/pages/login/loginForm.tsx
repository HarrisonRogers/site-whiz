'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { login, signup } from '@/app/login/action';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator/separator';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type FormSchema = z.infer<typeof formSchema>;

function LoginForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const handleLoginSubmit = async (data: FormSchema) => {
    await login(data);
  };

  const handleSignupSubmit = async (data: FormSchema) => {
    await signup(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account or create a new one
          </p>
        </div>

        {/* Form Card */}
        <Card className="border p-6">
          <FormProvider {...form}>
            <form className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span className="inline-block w-4 h-4 text-red-500">⚠</span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span className="inline-block w-4 h-4 text-red-500">⚠</span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                {/* Primary Login Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit(handleLoginSubmit)}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Logging in...
                    </div>
                  ) : (
                    'Log In'
                  )}
                </Button>

                <div className="py-5 relative">
                  <Separator />
                  <span className="text-sm text-gray-500 absolute bg-card px-4 -translate-x-1/2 left-1/2 top-2">
                    Or
                  </span>
                </div>

                {/* Secondary Signup Button */}
                <Button
                  variant="outline"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit(handleSignupSubmit)}
                  className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      Signing up...
                    </div>
                  ) : (
                    'Create New Account'
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        </Card>

        {/* Footer Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
