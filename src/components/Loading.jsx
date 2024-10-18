import loadingImg from "../assets/loading.svg";

function Loading() {
  return (
    <img src={loadingImg} className="absolute w-1/5 top-[10%] left-0 right-0 mx-auto ">
    </img>
  );
}

export default Loading;
