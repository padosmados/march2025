import Image from 'next/image';

type UserInfoProps = {
  profile: {
    profileImage: string;
    firstName: string;
  };
};

function UserInfo({ profile: { profileImage, firstName } }: UserInfoProps) {
  return (
    <article className='grid grid-cols-[auto,1fr] gap-4 mt-4'>
      {/* Display only the host's image */}
      <Image
        src={profileImage}
        alt={firstName}
        width={50}
        height={50}
        className='rounded-md w-12 h-12 object-cover'
      />
      <div>
        {/* Display only the host's name */}
        <p className='font-bold'>{firstName}</p>
      </div>
    </article>
  );
}

export default UserInfo;

