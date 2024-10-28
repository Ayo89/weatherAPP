import loadingImg from "../assets/loading.svg";
import PropTypes from "prop-types";

function Loading({isLoading}) {
  return (
    <img src={loadingImg} className={`${isLoading ? 'opacity-1':'opacity-0'} absolute w-1/5 top-[10%] left-0 right-0 mx-auto`}>
    </img>
  );
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loading;
