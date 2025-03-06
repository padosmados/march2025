'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { actionFunction } from '@/utils/types';

const initialState = {
  message: '',
};

function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  // Keep useFormState for toast messages.
  const [state] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state, toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Optional: log the FormData for debugging.
    console.group('Submitted FormData');
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.groupEnd();
    await action(null, formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      encType="multipart/form-data"
      className="space-y-4"
    >
      {children}
    </form>
  );
}

export default FormContainer;
