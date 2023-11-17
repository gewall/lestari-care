import NextLink from "next/link";

export default function Link({ href, children }) {
  return <NextLink href={href}>{children}</NextLink>;
}
