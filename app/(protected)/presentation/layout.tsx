import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div className="size-full overflow-x-hidden">{children}</div>;
};

export default Layout;
