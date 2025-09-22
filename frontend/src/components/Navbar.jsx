import { Link } from "react-router";    // Importing Link for navigation
import { PlusIcon } from "lucide-react";    // Importing an icon from lucide-react

const Navbar = () => {
  return (
    <header className="bg-black text-white p-4">
        <div className="mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl text-primary font-bold font-mono tracking-tight">Marriage Building-blocks</h1>
                <div className="flex items-center gap-4">
                    <Link to={"/create"} className="btn btn-primary gap-2">
                        <PlusIcon className="size-5" />
                        <span>New Note</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Navbar;