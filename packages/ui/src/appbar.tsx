'use client';

import { Button } from "./button";

export const Appbar = ({ signIn, signOut }: { signIn: ()=>void, signOut: ()=> void }) => {
  return (
    <div className="max-w-screen mx-auto">
      <nav className="w-full flex justify-between items-center py-4 px-4 border-b border-gray-500">
        <div className="font-bold text-blue-600">WorkStream</div>
        <div className="flex gap-4">
          <Button clickHandler={signIn} className="bg-slate-800 text-white px-5 py-2.5">Sign In</Button>
          <Button clickHandler={signOut} className="bg-red-600 text-white px-5 py-2.5">Sign Out</Button>
        </div>
      </nav>
    </div>
  );
};
