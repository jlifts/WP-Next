import React from 'react';
import { CTAProps } from 'typings/global';
import Heading from '../Heading';

function CTA({
  title = 'Get in touch',
  buttonText,
  buttonURL,
  children,
  headingLevel = 'h1',
}: CTAProps): JSX.Element {
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
