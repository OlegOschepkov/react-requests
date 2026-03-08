import {Link, chakra} from '@chakra-ui/react';

interface LinkProps {
  href: string;
  children  : string;
}

const LinkCustom = ( {href, children } : LinkProps) => {
  return (
    <Link href={href} variant="plain" >{children}</Link>
  );
};

export default LinkCustom;
