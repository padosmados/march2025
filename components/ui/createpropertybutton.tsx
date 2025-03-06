import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const CreatePropertyButton = () => {
  const { user } = useUser();
  const router = useRouter(); // ✅ Define router here

  if (!user || user.id !== process.env.NEXT_PUBLIC_ADMIN_USER_ID) {
    return null; // Hide button for non-admins
  }

  return <button onClick={() => router.push('/create-property')}>Create Property</button>;
};

export default CreatePropertyButton;

