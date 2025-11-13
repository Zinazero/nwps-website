import { Outlet } from 'react-router-dom';

export const Admin = () => {
  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <div>
        <Outlet />
      </div>
    </>
  );
};
