import { User } from "@/lib/models/user";

type Props = {
    params: {
    id: Promise<string>;
 }
}

export default async function Home(props: Props) {
 
    const { id }=  await props.params;
    const response = await fetch(`http://localhost:3030/users/${id}`);
    const user = await response.json() as User;

    return (
        <>
            <h1>Welcome to the dashboard, {user.name}!</h1>
        </>
    );

}