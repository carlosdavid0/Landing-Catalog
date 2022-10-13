import { Footer } from "flowbite-react";
import React from "react";

export default function FooterAPP() {
    const year = new Date().getFullYear();
  return (
    <div className="dark:bg-slate-900">
      <Footer container={true}>
        <Footer.Copyright href="https://dsolucoes.com" by="Powered by Dsoluções" year={year} />
       
      </Footer>
    </div>
  );
}
