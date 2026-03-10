import { Link } from "@chakra-ui/react";

interface LinkProps {
  href: string;
  children: string;
}

import { chakra } from "@chakra-ui/react";

const StyledLink = chakra("a", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    px: 3,
    py: 2,
    borderRadius: "md",
    transition: "all 0.2s",
  },
});

const LinkCustom = ({ href, children }: LinkProps) => {
  return <StyledLink href={href}>{children}</StyledLink>;
};

export default LinkCustom;
