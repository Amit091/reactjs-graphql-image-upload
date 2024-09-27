import { SiGraphql, SiReact } from 'react-icons/si';
import { VscCloudUpload } from 'react-icons/vsc';
import { BiImageAdd } from 'react-icons/bi';
import { FaEquals, FaPlus } from 'react-icons/fa6';

export const Title = () => (
  <div className="flex flex-col align-middle items-center">
    <div className="flex items-center space-x-2 mb-4 text-center">
      <SiReact className="h-12 w-12 text-blue-500" />
      <FaPlus className="h-6 w-6 text-gray-300" />
      <BiImageAdd className="h-12 w-12 text-green-400" />
      <FaPlus className="h-6 w-6 text-gray-300" />
      <SiGraphql className="h-12 w-12 text-pink-500" />
      <FaEquals className="h-6 w-6 text-gray-300" />
      <VscCloudUpload className="h-12 w-12 text-blue-500" />
    </div>

    <h2 className="text-3xl max-sm:text-lg md:text-2xl font-bold text-gray-300 mb-1">
      React + Graphql Image Upload Example
    </h2>
  </div>
);
