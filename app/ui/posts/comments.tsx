"use client";
import React from "react";

type Comment = {
  author: string;
  text: string;
};

export default function Comments({ comment }: { comment: Comment[] }) {
  const [coms, setComs] = React.useState(comment);
  const [text, setText] = React.useState("");
  function handleClick() {
    setComs([...coms, { author: "User", text }]);
    setText("");
  }

  return (
    <div className='mt-4 max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 pt-4'>
      <h2 className='p-1 m-0 text-lg font-bold pb-4'>Comments</h2>
      <div>
        {coms.map((comment) => (
          <div className='bg-slate-100 mb-2 p-2 rounded-md'>
            <h3 className='font-bold text-gray-600'>{comment.author}</h3>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <div className='flex'>
        <input
          type='text'
          name='comment'
          id=''
          className='w-full bg-slate-100 border-0 rounded-md'
          placeholder='Leave a comment'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          onClick={handleClick}
          className='bg-green-600 text-md text-white font-bold p-2 rounded-md ml-2'
        >
          Send
        </button>
      </div>
    </div>
  );
}
