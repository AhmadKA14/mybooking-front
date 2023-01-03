import useFetch from "../../hooks/useFetch"
import LoadingScreen from 'react-loading-screen';
import "./featured.css"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";

const Featured = () => {
    const [destination, setDestination] = useState("")

    const { data, loading, error } = useFetch("hotels/countByCity?cities=niagara falls,toronto,montreal")
    const { reFetch } = useFetch(`hotels?city=${destination.toString().toLowerCase()}`)


    const navigate = useNavigate()
    const { dispatch } = useContext(SearchContext)

    const options = {
        adult: 1,
        children: 0,
        rooms: 1
    }

    const dates = [{
        startDate: new Date(),
        endDate: new Date()
    }]

    const handleClick = (destination) => {
        setDestination(destination)
        reFetch()
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
        navigate("/hotels", { state: { destination, dates, options } })
    }

    return (
        <div className="featured">
            {loading ?
                <LoadingScreen
                    loading={true}
                    bgColor='#f1f1f1'
                    spinnerColor='#9ee5f8'
                    textColor='#676767'
                    text='Loading please wait...'
                />
                : (<>
                    <div onClick={() => handleClick("Niagara Falls")} className="featuredItem">
                        <img src="https://t-cf.bstatic.com/xdata/images/city/square250/653240.webp?k=6b015a87c8443039a685038e97dd58dab6a8748078948b27cca7d1a5fcef308d&o=" alt="" className="featuredImg" />
                        <div className="featuredTitles">
                            <h1>Niagra Falls</h1>
                            <h2>{data[0]} properties</h2>
                        </div>
                    </div>
                    <div onClick={() => handleClick("Toronto")} className="featuredItem">
                        <img src="https://t-cf.bstatic.com/xdata/images/city/square250/971990.webp?k=6d52fe4a57a984e2d540e3d7a1910f8a76fda3a57708faddd74e2109c3344b5e&o=" alt="" className="featuredImg" />
                        <div className="featuredTitles">
                            <h1>Toronto</h1>
                            <h2>{data[1]} properties</h2>
                        </div>
                    </div>
                    <div onClick={() => handleClick("Montreal")} className="featuredItem">
                        <img src="https://t-cf.bstatic.com/xdata/images/city/square250/653231.webp?k=526fe3dd8fc78cbaccaee3be9e675b624e73b666ab757ecb0ebf31c7f7d96264&o=" alt="" className="featuredImg" />
                        <div className="featuredTitles">
                            <h1>Montreal</h1>
                            <h2>{data[2]} properties</h2>
                        </div>
                    </div>
                </>)}
        </div>
    )
}

export default Featured