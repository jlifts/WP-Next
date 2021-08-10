import React from 'react';
import Heading, { HeadingProps } from './Heading';

interface Props {
  title: string;
  buttonText?: string;
  buttonURL?: string;
  children?: React.ReactNode;
  headingLevel?: HeadingProps['level'];
}

function CTA({
  title = 'Get in touch',
  buttonText,
  buttonURL,
  children,
  headingLevel = 'h1',
}: Props): JSX.Element {
  return (
    <section>
      <div>
        <Heading level={headingLevel}>{title}</Heading>
        <div>
          <div>{children}</div>
          {buttonText && buttonURL && (
            <div>
              <a href={buttonURL} className="button">
                {buttonText}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CTA;
