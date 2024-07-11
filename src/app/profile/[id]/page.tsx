
export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl bg-gray-600 text-white p-2 rounded-full">Profile Page</h1>
            <hr />
            <p className="text-xl">
            <span className=" p-2 ml-2 rounded text-black">{params.id}</span>
            </p>
        </div>
    )
}
