import React from "react";

export default function Home(){
  return <>hello world</>;
};

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: '/projects',
    },
  }
}


