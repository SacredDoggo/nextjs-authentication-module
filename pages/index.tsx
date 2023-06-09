import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

import useCurrentUser from "@/hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false
			}
		}
	}

	return {
		props: {}
	}
}

export default function Home() {
	const { data: user } = useCurrentUser();

	return (
		<>
			<h1 className="text-2xl text-green-500">NextJS authentication using Next-Auth</h1>
			<p className="text-white">Logged in as : {user?.name}</p>
			<button className="w-full h-10 bg-white" onClick={() => signOut()}>Logout</button>
		</>
	);
}