import "./header.css"
import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DateRange } from 'react-date-range';
import { useContext, useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns"
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adults: 1,
        children: 0,
        rooms: 1
    })

    const navigate = useNavigate()

    const handleOption = (name, operator) => {
        setOptions(prev => {
            return {
                ...prev,
                [name]: operator === "i" ? options[name]++ : options[name]--
            }
        })
    }

    const { dispatch } = useContext(SearchContext)
    const { user } = useContext(AuthContext)

    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
        navigate("/hotels", { state: { destination, dates, options } })
    }

    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>
                {type !== "list" &&
                    <>
                        <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                        <p className="headerDesc">Get rewarded for your travels – unlock instant savings of 10% or
                            more with a free Mybooking account</p>
                        {!user && <button onClick={() => navigate("/register")} className="headerBtn">Create a new account!</button>}
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input
                                    type="text"
                                    placeholder="Where is your destination?"
                                    className="headerSearchInput"
                                    onChange={e => setDestination(e.target.value)}
                                />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                                <span onClick={() => {
                                    if (openOptions) { setOpenOptions(false) }
                                    setOpenDate(!openDate)
                                }} className="headerSearchText">
                                    {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                                </span>
                                {openDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    className="date"
                                    minDate={new Date()}
                                />}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <span onClick={() => {
                                    if (openDate) { setOpenDate(false) }
                                    setOpenOptions(!openOptions)
                                }} className="headerSearchText">
                                    {`${options.adults} adult · ${options.children} children · ${options.rooms} room`}
                                </span>
                                {openOptions && <div className="options">
                                    <div className="optionItem">
                                        <span className="optionText">Adults</span>
                                        <div className="optionCounter">
                                            <button disabled={options.adults <= 1} className="optionsCounterBtn" onClick={() => handleOption("adults", "d")}>-</button>
                                            <span className="optionsCounterNum">{options.adults}</span>
                                            <button className="optionsCounterBtn" onClick={() => handleOption("adults", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button disabled={options.children <= 0} className="optionsCounterBtn" onClick={() => handleOption("children", "d")}>-</button>
                                            <span className="optionsCounterNum">{options.children}</span>
                                            <button className="optionsCounterBtn" onClick={() => handleOption("children", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button disabled={options.rooms <= 1} className="optionsCounterBtn" onClick={() => handleOption("rooms", "d")}>-</button>
                                            <span className="optionsCounterNum">{options.rooms}</span>
                                            <button className="optionsCounterBtn" onClick={() => handleOption("rooms", "i")}>+</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Header