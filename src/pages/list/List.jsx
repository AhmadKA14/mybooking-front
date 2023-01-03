import "./list.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import { useLocation, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { format } from "date-fns"
import { DateRange } from "react-date-range"
import SearchItem from "../../components/searchItem/SearchItem"
import useFetch from "../../hooks/useFetch"
import LoadingScreen from 'react-loading-screen';
import { SearchContext } from "../../context/SearchContext"

const List = () => {
    const location = useLocation()
    const [destination, setDestination] = useState(location.state.destination)
    const [dates, setDates] = useState(location.state.dates)
    const [openDates, setOpenDates] = useState(false)
    const [options, setOptions] = useState(location.state.options)
    const [min, setMin] = useState(undefined)
    const [max, setMax] = useState(undefined)

    const { data, loading, error, reFetch } = useFetch(
        `hotels?city=${destination.toString().toLowerCase()}&min=${min || 0}&max=${max || 999}`
    )

    const navigate = useNavigate()
    const { dispatch } = useContext(SearchContext)

    const handleClick = () => {
        setOpenDates(!openDates)
        reFetch()
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
        navigate("/hotels", { state: { destination, dates, options } })
    }

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Destination</label>
                            <input
                                placeholder={destination}
                                type="text"
                                onChange={e => setDestination(e.target.value)}
                            />
                        </div>
                        <div className="lsItem">
                            <label>Check-in Date</label>
                            <span
                                onClick={() => setOpenDates(!openDates)}>
                                {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDates && <DateRange
                                onChange={item => setDates([item.selection])}
                                ranges={dates}
                                minDate={new Date()}
                            />}
                        </div>
                        <div className="lsItem">
                            <label>Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Min price <small>per night</small>
                                    </span>
                                    <input
                                        type="number"
                                        onChange={e => setMin(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Max price <small>per night</small>
                                    </span>
                                    <input
                                        type="number"
                                        onChange={e => setMax(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Adult
                                    </span>
                                    <input
                                        type="number"
                                        className="lsOptionInput"
                                        placeholder={options.adult}
                                        min={1}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Children
                                    </span>
                                    <input
                                        type="number"
                                        className="lsOptionInput"
                                        placeholder={options.children}
                                        min={0}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Rooms
                                    </span>
                                    <input
                                        type="number"
                                        className="lsOptionInput"
                                        placeholder={options.rooms}
                                        min={1}
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="listResult">
                        {loading ?
                            <LoadingScreen
                                loading={true}
                                bgColor='#f1f1f1'
                                spinnerColor='#9ee5f8'
                                textColor='#676767'
                                text='Loading please wait...'
                            />
                            :
                            <>
                                {data.map(item => (
                                    <SearchItem item={item} key={item._id} />
                                ))}
                            </>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List