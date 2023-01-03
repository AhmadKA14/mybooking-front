import useFetch from "../../hooks/useFetch"
import { Link, useNavigate } from "react-router-dom"
import "./featuredProperties.css"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext"
import LoadingScreen from 'react-loading-screen';

const FeaturedProperties = () => {
    const [destination, setDestination] = useState("")
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [options, setOptions] = useState({
        adults: 1,
        children: 0,
        rooms: 1
    })

    const navigate = useNavigate()

    const { dispatch } = useContext(SearchContext)
    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
        navigate("/")
    }

    const { data, loading } = useFetch("hotels?featured=true&limit=4")

    return (
        <div className="fp">
            {loading ?
                <LoadingScreen
                    loading={true}
                    bgColor='#f1f1f1'
                    spinnerColor='#9ee5f8'
                    textColor='#676767'
                    text='Loading please wait...'
                />
                : (<>
                    {data.map(item => (
                        <div className="fpItem" key={item._id}>
                            <img src={item.photos[0]} alt="" className="fpImg" />
                            <Link onClick={handleSearch} className="lnk" to={`/hotels/${item._id}`}>
                                <span className="fpName">{item.name}</span>
                            </Link>
                            <span className="fpCity">{item.city}</span>
                            <span className="fpPrice">Starting from CAD {item.cheapestPrice}</span>
                            {item.rating && <div className="fpRating">
                                <button>{item.rating}</button>
                                <span>Excellent</span>
                            </div>}
                        </div>
                    ))}
                </>)}
        </div>
    )
}

export default FeaturedProperties