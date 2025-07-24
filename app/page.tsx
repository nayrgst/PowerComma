import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';

export default async function Home() {
  const checkUser = await onAuthenticateUser();

  if (!checkUser.user) {
    redirect('/sign-in');
  }
  if (checkUser.user) {
    redirect('/dashboard');
  }
}
