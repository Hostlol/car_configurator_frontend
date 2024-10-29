import Image from 'next/image'
import Link from "next/link";

export default function Component() {
  return (
      <div className="min-h-screen text-white">
        <div className="container mx-auto px-4 py-8">

          <main>
            <div className="rounded-lg overflow-hidden mb-8">
              <Image
                  src="/honda_homepage.png"
                  alt="2024 Honda Civic Type R"
                  width={800}
                  height={400}
                  layout="responsive"
                  className="w-full object-cover"
              />
            </div>

            <Link href="/configuration">
              <button
                  className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Customize your dream car!
              </button>
            </Link>

            <div className="text-sm text-gray-400 space-y-1">
              <p>Starting at $45,000</p>
              <p>Customize color, rims, motor options, and more.</p>
              <p>Available for delivery in as little as 30 days.</p>
              <p>Rated 5 stars by over 1,000 satisfied customers.</p>
            </div>
          </main>
        </div>
      </div>
  )
}