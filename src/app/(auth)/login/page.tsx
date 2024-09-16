import SigninForm from '@/components/Auth/SigninForm';
import { checkIfNoUserExists } from './actions';

export default async function Page() {
  await checkIfNoUserExists();
  return (
    <>
      <SigninForm />
    </>
  );
}
