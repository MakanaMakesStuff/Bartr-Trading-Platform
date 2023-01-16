import Layout from "@core/src/components/Layout";
import { ReactNode } from "react";
import style from "@core/src/styles/components/Layouts/404.module.scss";
import Header from "@core/src/components/Header/Main";

export default function NotFoundLayout({ children }: { children: ReactNode }) {
	return (
		<Layout header={<Header />} style={style}>
			{children}
		</Layout>
	);
}
