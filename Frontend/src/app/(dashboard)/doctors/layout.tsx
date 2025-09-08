// frontend/src/app/(dashboard)/doctors/layout.tsx
import { ApolloWrapper } from "@/lib/ApolloWrapper";

export default function RootLayout({ children }) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}