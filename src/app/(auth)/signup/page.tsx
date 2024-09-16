import SignupForm from '@/components/Auth/SignupForm';
import { checkIfUserExists } from './action';

export default async function Page() {
  //if a user already exists, redirect to login page
  //no new users can be created if a user already exists
  await checkIfUserExists();

  return (
    <>
      <SignupForm />
    </>
  );
}
