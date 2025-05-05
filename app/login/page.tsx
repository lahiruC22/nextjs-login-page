import { Logo } from '@/app/ui/logo';
import LoginForm from '@/app/ui/login/login-form';
import { Testimonial } from '@/app/ui/testimonal';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-[#171717]">
      <div className="flex flex-col justify-center px-8 md:px-16 lg:w-1/2">
        <div className="mb-12">
          <Logo />
        </div>

        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-white">Welcome back to Room.me!</h1>
          <p className="text-lg text-gray-300">
            Room.me is an innovative video conference product that revolutionizes virtual meetings.
          </p>
        </div>

        <LoginForm />
      </div>

      <div className="hidden relative lg:block lg:w-1/2">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img
          src="/placeholder.svg?height=900&width=700"
          alt="People in a video conference"
          className="h-full w-full object-cover"
        />
        <Testimonial
          quote="We love the screen sharing and whiteboarding features, which have improved our presentations. Room.me has become an essential tool for our team, allowing us to collaborate effectively. Highly recommended!"
          author="Sarah Markivoc"
          position="Project Manager"
          activeIndex={0}
        />
      </div>
    </div>
  )
}
