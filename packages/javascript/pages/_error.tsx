import { FC } from 'react';

export interface ErrorProps {
  statusCode: number;
  // getInitialProps: any;
}

export interface InitialPropsInt {
  res: {
    statusCode: number;
  };
  err: {
    statusCode: number;
  };
}

const Error: FC<ErrorProps> = ({ statusCode }) => {
  return (
    <p>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </p>
  );
};

// @ts-ignore
Error.getInitialProps = ({ res, err }: InitialPropsInt) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
