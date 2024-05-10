import { Puff } from "react-loader-spinner"

const Spinner = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center absolute">
            <Puff
                visible={true}
                height="100"
                width="100"
                color="#427DF5"
                ariaLabel="puff-loading"
            />
        </div>
    )
}

export default Spinner