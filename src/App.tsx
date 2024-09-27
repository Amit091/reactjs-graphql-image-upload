import { ApolloProvider } from '@apollo/client';
import client from './lib/apollo-client';
import { Title } from './components/Title';
import { SingleUpload } from './components/SingleUpload';
import ToggleSwitch from './components/ToggleSwitch';
import { useState } from 'react';
import { MultipleUpload } from './components/MultipleUpload';

const App = () => {
  const [isMultiple, setIsMultiple] = useState(false);
  const onChange = (isMultiple: boolean) => {
    setIsMultiple(isMultiple);
  };
  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col gap-10 items-center justify-center h-screen overflow-auto bg-gray-800 text-white pb-50">
        <div className=" max-w-[60vw] w-[60vw] max-sm:max-w-[90vw] max-sm:w-[90vw]">
          <Title />
          <hr className="border-1 border-dashed my-3" />
          <div className=" flex items-center justify-around">
            <ToggleSwitch initialChecked={isMultiple} onChange={onChange} />
          </div>
          {isMultiple ? <MultipleUpload /> : <SingleUpload />}
        </div>
      </div>
    </ApolloProvider>
  );
};

export default App;
