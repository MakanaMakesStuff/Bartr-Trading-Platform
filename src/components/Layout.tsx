import { CSSProperties, ReactNode } from "react";

export default function Layout({
	header,
	children,
	footer,
	style,
}: {
	header?: any;
	children: ReactNode;
	footer?: any;
	style?: any;
}) {
	return (
		<div className={style.layout}>
			<div className={style.header}>{header}</div>
			<div className={style.content}>{children}</div>
			<div className={style.footer}>{footer}</div>
		</div>
	);
}
