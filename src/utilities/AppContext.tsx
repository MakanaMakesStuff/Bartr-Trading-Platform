import {
	ApolloError,
	ApolloProvider,
	DocumentNode,
	gql,
	useQuery,
} from "@apollo/client";
import { BlogInfoFragment } from "@core/src/fragments/GeneralSettings";
import { apolloClient } from "@core/src/utilities/AppData";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export interface AppContextState {
	viewer: ViewerI;
	settings: GeneralSettingsI;
	loggedIn?: boolean;
}

export interface AppContextProps {
	state: AppContextState;
	updateState: ({ ...args }) => void;
	loading: boolean;
	error: ApolloError | Error;
	appQuery: DocumentNode;
}

export default function AppProvider({ children }: { children: ReactNode }) {
	const { data, loading, error } = useQuery(ViewerQuery, {
		client: apolloClient,
	});

	const [state, updateState] = useState<AppContextState>({
		viewer: data?.viewer,
		settings: data?.generalSettings,
		loggedIn: data?.viewer ? true : false,
	});

	useEffect(() => {
		if (loading || error) return;
		updateState({
			...state,
			viewer: data?.viewer,
			settings: data?.generalSettings,
			loggedIn: data?.viewer ? true : false,
		});
	}, [data, error]);

	return (
		<AppContext.Provider
			value={{ state, loading, error, updateState, appQuery: ViewerQuery }}
		>
			<ApolloProvider client={apolloClient}>{children}</ApolloProvider>
		</AppContext.Provider>
	);
}

export interface ViewerI {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	roles: {
		nodes: {
			name: string;
			displayName: string;
		}[];
	};
	avatar: {
		url: string;
	};
}

export interface GeneralSettingsI {
	dateFormat: string;
	description: string;
	language: string;
	startOfWeek: string;
	timeFormat: string;
	timezone: string;
	title: string;
	url: string;
}

export const ViewerQuery = gql`
	${BlogInfoFragment}
	query AppQuery {
		viewer {
			id
			lastName
			username
			roles {
				nodes {
					name
					displayName
				}
			}
			firstName
			email
			avatar {
				url
			}
		}
		generalSettings {
			...BlogInfoFragment
		}
	}
`;
