import ResetForm from '@/components/Auth/ResetForm';
import { generateResetKey } from './actions';

export default async function Page() {
  await generateResetKey();

  return (
    <>
      <ResetForm />
    </>
  );
}
