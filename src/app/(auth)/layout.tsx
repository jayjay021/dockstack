import classes from './layout.module.css';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={classes.main}>{children}</main>;
}
