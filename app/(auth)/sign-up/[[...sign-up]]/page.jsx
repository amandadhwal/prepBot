import { SignUp } from '@clerk/nextjs'

export default function SignupPage() {
  return (
    <section className="bg-gray-200 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8">
        
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <SignUp />
        </div>
        
      </div>
    </section>
  )
}