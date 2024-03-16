import Image from "next/image";

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <Image
        width={30}
        height={30}
        src={picture}
        className="w-8 h-8 rounded-full mr-4"
        alt={name}
      />
      <div className="text-sm font-bold">{name}</div>
    </div>
  );
};

export default Avatar;
