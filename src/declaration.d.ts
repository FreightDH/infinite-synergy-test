declare module '*.module.scss' {
  const styles: { [key: string]: string };
  export default styles;
}

type User = {
  id: string;
  name: string;
  department: string;
  company: string;
  jobTitle: string;
};
