function Inputbox({ placeholder, id, title, ref }) {
  return (
    <div className="text-black">
      <label className="block mt-6 font-semibold" htmlFor={id}>
        {title}
      </label>
      <input
        ref={ref}
        className="border border-textcol w-full rounded-md px-2 mt-1 py-2"
        type="text"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Inputbox;
