import Footer from "@/components/common/layout/Footer";
import Nav from "@/components/common/layout/Nav/index";
import React from "react";

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12 md:mb-0">
      <Nav />
      <main className="customer-layout">{children}</main>
      <Footer />
    </div>
  );
}
