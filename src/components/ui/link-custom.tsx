import { chakra, type HTMLChakraProps } from "@chakra-ui/react";

type LinkCustomProps = HTMLChakraProps<"a">;

const StyledLink = chakra("a", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    px: 3,
    py: 2,
    borderRadius: "md",
    transition: "all 0.2s",
  },
});

const LinkCustom = ({ href, children, ...props }: LinkCustomProps) => {
  return (
    <StyledLink href={href} {...props}>
      {children}
    </StyledLink>
  );
};

export default LinkCustom;
