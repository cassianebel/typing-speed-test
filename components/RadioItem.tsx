type Props = {
  label: string;
  name: string;
  id: string;
  state: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioItem({
  label,
  name,
  id,
  state,
  changeHandler,
}: Props) {
  return (
    <>
      <input
        type="radio"
        name={name}
        id={id}
        value={label}
        checked={state === label}
        onChange={changeHandler}
        className="peer md:sr-only"
      />
      <label
        htmlFor={id}
        className="md:border border-neutral-500 md:hover:border-blue-500 md:hover:text-blue-500 transition-colors duration-200 md:peer-focus:outline-2 outline-offset-3 p-1 px-2 peer-checked:border-blue-500 peer-checked:md:text-blue-500 rounded-md cursor-pointer grow"
      >
        {label}
      </label>
    </>
  );
}
