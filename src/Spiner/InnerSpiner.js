import { Dna } from "react-loader-spinner";

const InnerSpiner = () => {
    
    return(
      <div className=" w-full h-screen bg-black flex justify-center items-center z-10">
          <Dna width="80" color="#fa2a55" />
      </div>
    )
};

export default InnerSpiner;