import Head from "next/head";

interface MetaProps {
  title: string;
}

const Meta = ({ title }: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content="Jerome Janicot" />
    </Head>
  );
};

export default Meta;

//Default title
Meta.defaultProps = {
  title: "Jerome Janicot",
};
