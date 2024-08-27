import loader from '@/assets/loader.gif';
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image src={loader} width={200} height={200} alt="loading..." />
    </div>
  );
};

export default Loader;
