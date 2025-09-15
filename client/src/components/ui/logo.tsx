'use client'
import Image from "next/image"
import Link from "next/link"
function logo() {
    return (
        <>
            <Link href={'/'}>
                <Image
                    src={'/pexels_logo.png'}
                    width={85}
                    height={85}
                    alt="logo"
                    quality={100}
                />
            </Link>
        </>
    )
}

export default logo