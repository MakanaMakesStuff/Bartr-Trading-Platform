import Layout from "@core/src/components/Layout";
import { ReactNode } from "react";
import style from "@core/src/styles/components/Layouts/Account.module.scss";
import Header from "@core/src/components/Header/Main";

export default function AccountLayout({ children }: { children: ReactNode }) {
	return (
		<Layout header={<Header />} style={style}>
			{children}
		</Layout>
	);
}
