import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { axiosInstance } from "../../config.js"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import useFetch from "../../hooks/useFetch"
import "./reserve.css"

const Reserve = ({ setOpen, hotelId }) => {
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`)
    const { dates } = useContext(SearchContext)
    const [selectedRooms, setSelectedRooms] = useState([])

    const getDatesInRange = (startDate, endDate) => {
        const date = new Date(startDate.getTime())
        let list = []

        while (date <= endDate) {
            list.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return list
    }
    const allDates = (getDatesInRange(dates[0].startDate, dates[0].endDate));
    const isAvailable = (roomNum) => {
        const isFound = roomNum.unavailableDates.some(date =>
            allDates.includes(new Date(date).getTime()))

        return !isFound
    }

    const navigate = useNavigate()

    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] :
            selectedRooms.filter(item => item !== value))
    }

    const handlClick = async () => {
        try {
            await Promise.all(selectedRooms.map(roomId => {
                const res = axiosInstance.put(`/rooms/availability/${roomId}`, { dates: allDates })
                return res.data
            }))
            setOpen(false)
            navigate("/")
        } catch (error) {

        }
    }

    return (
        <div className="reserve">
            <div className="reserveContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="close"
                    onClick={() => setOpen(false)} />
                <span>Select your rooms:</span>
                {data.map(item => (
                    <div className="reserveItem">
                        <div className="itemInfo">
                            <div className="title">{item.title}</div>
                            <div className="desc">{item.desc}</div>
                            <div className="max">Maximum number of people: <b>{item.maxPeople}</b></div>
                            <div className="price">Price: ${item.price}</div>
                        </div>
                        <div className="selectRooms">
                            {item.roomsNumbers.map(roomNum => (
                                <div className="room">
                                    <label>{roomNum.number}</label>
                                    <input
                                        type="checkbox"
                                        value={roomNum._id}
                                        onChange={handleSelect}
                                        disabled={!isAvailable(roomNum)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handlClick} className="btn">Reserve Now!</button>
            </div>
        </div>
    )
}

export default Reserve