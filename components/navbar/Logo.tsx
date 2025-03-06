'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <div className="flex justify-start items-center">
            <Image 
                alt="Logo"
                className="cursor-pointer"
                height="75"
                width="75"
                src="/images/logo.png"
                onClick={() => router.push('/')}
            />
        </div>
    );
}

export default Logo;

