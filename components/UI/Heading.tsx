import React from 'react';
import { HeadingProps } from 'typings/global';

// Heading allows components to pass a heading level via props.
function Heading({
  level = 'h1',
  children,
  className,
}: HeadingProps): JSX.Element {
  const H = ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(level, props, children);

  return <H className={className}>{children}</H>;
}

export default Heading;
export type { HeadingProps };
